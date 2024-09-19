const dbs = require('../config/dbs');
const { QueryTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    login : async (req, res) => {
        let body = req.body;
        if(!body || !body.password || !body.email){
            res.status(500).json({
                status: 'no data provided',
                message: 'no data provided'
            });
            return;
        }

        try {
            const [results, metadata] = 
                await dbs.query('select id, name, password, is_admin from Users where email = :mail', {
                    replacements : {
                        mail : body.email
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
                status: 'failure',
                message: error
            });
        }
    },

    // get only the reports that has been approved by admin
    register : async (req, res) => {
        let body = req.body;
        if(!body || !body.password || !body.email || !body.name){
            res.status(500).json({
                status: 'no data provided',
                message: 'no data provided'
            });
            return;
        }

        bcrypt.hash(body.password, saltRounds).then(async function(hash) {
            try {
                const [results, metadata] = 
                await dbs.query('insert into Users (email, password, name) values (:mail, :pass, :nm)', {
                    replacements : {
                        mail : body.email,
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
                    status: 'failure',
                    message: error.message
                });
            }
        });
    }
}