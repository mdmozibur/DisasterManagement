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
                await dbs.query('select id, password, is_admin from Users where email = :mail', {
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
        if(!body || !body.password || !body.email){
            res.status(500).json({
                status: 'no data provided',
                message: 'no data provided'
            });
            return;
        }

        try {

            bcrypt.hash(body.password, saltRounds).then(async function(hash) {
                const [results, metadata] = 
                await dbs.query('insert into Users (email, password) values (:mail, :pass)', {
                    replacements : {
                        mail : body.email,
                        pass : hash
                    },
                    type : QueryTypes.INSERT
                });
                res.status(200).send('success');
            });
        } catch (error) {
            res.status(500).json({
                status: 'failure',
                message: error
            });
        }
    }
}