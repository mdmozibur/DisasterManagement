const dbs = require('../config/dbs');
const { QueryTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const saltRounds = 10;

module.exports = {
    checkToken : async (token, _) => {
        var ret = {
            is_valid : false,
            is_admin : false
        }

        if(!token)
            return ret;

        try {
            const [results, metadata] = 
            await dbs.query('select id, is_admin from Users where session = :tkn', {
                replacements : {
                    tkn : token
                },
                type : QueryTypes.SELECT
            });
            
            if(results && results.id && results.is_admin){
                ret.is_valid = true;
                ret.is_admin = results.is_admin;
            }
        } catch (error) {
            return ret;
        }
        return ret;
    },

    login : async (req, res) => {
        let body = req.body;
        if(!body || !body.password || !body.phone){
            res.status(400).json({
                status: 'no data provided',
            });
            return;
        }

        try {
            const [results, metadata] = 
                await dbs.query('select id, name, password, is_admin from Users where phone = :phn and is_Verified = true', {
                    replacements : {
                        phn : body.phone
                    },
                    type : QueryTypes.SELECT
                });

                // Load hash from DB.
                bcrypt.compare(body.password, results.password, async function(err, result) {
                    if(result === true){
                        var uuid = uuidv4();

                        await dbs.query('update Users set session = :tkn where id = :uid', {
                            replacements : {
                                tkn : uuid,
                                uid : results.id
                            },
                            type : QueryTypes.UPDATE
                        });

                        res.status(200).json({
                            id : results.id,
                            name : results.name,
                            is_admin : results.is_admin,
                            session : uuid
                        });
                    }
                    else{
                        res.status(401).json({
                            status: 'failure',
                            message: err
                        });
                    }
                });
        } catch (error) {
            res.status(500).json({
                message: error.errors
            });
        }
    },

    register : async (req, res) => {
        let body = req.body;

        // if payload doesn't contain appropriate data, then return error
        if(!body || !body.password || !body.phone || !body.name){
            res.status(400).json({
                message: 'no data provided'
            });
            return;
        }

        bcrypt.hash(body.password, saltRounds).then(async function(hash) {
            try {
                const [_, metadata] = 
                await dbs.query('insert into Users (phone, password, name) values (:phn, :pass, :nm)', {
                    replacements : {
                        phn : body.phone,
                        pass : hash,
                        nm : body.name
                    },
                    type : QueryTypes.INSERT
                });
                res.status(200).send('success');        
            } 
            catch (error) {
                if(error.name === 'SequelizeUniqueConstraintError'){
                    res.status(400).json({
                        errorMessage: error.errors[0].message
                    });
                    return;
                }
                res.status(500).json({
                    message: error.message
                });
            }
        });
    },
}