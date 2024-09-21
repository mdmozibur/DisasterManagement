const dbs = require('../config/dbs');
const { QueryTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
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
                await dbs.query('select id, name, password, is_admin from Users where phone = :phn', {
                    replacements : {
                        phn : body.phone
                    },
                    type : QueryTypes.SELECT
                });
                //console.log(results);

                // Load hash from your password DB.
                bcrypt.compare(body.password, results.password, function(err, result) {
                    if(result == true){
                        res.status(200).json({
                            id : results.id,
                            name : results.name,
                            is_admin : results.is_admin
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

    getVolunteers : async (req, res) => {
        try {
            const [results, metadata] = 
            await dbs.query("select id, phone, name from users where is_admin = false", {
                type : QueryTypes.RAW,
            });
            
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({
                message: error
            });;
        }
    },
}