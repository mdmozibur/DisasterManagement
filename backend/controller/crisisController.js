const dbs = require('../config/dbs');
const { QueryTypes } = require('sequelize');

module.exports = {
    post : async (req, res) => {
        let body = req.body;
        if(!body){
            res.status(500).json({
                status: 'no data provided',
                message: 'no data provided'
            });
            return;
        }
        //console.log(req.body);

        try {
            const [results, metadata] = 
            await dbs.query('insert into CrisisReports (location, severity, incident) values (:loc, :sev, :inc)', {
                replacements : {
                    loc : body.location,
                    sev : body.severity,
                    inc : body.incident
                },
                type : QueryTypes.INSERT
            });
            
            res.send(results);
        } catch (error) {
            res.status(500).json({
                status: 'failure',
                message: error
            });
        }
    },

    // get only the reports that has been approved by admin
    getAllApproved : async (req, res) => {
        try {
            const [results, metadata] = 
            await dbs.query("Select id, location, severity, status, incident from CrisisReports where status != 'reported'", {
                type : QueryTypes.RAW
            });
            
            res.status(200).send(results);
        } catch (error) {
            res.status(500).json({
                status: 'failure',
                message: error
            });
        }
    },

    // get only the reports that has been approved by admin
    getAll : async (req, res) => {
        try {
            const [results, metadata] = 
            await dbs.query("Select id, location, severity, status, incident from CrisisReports", {
                type : QueryTypes.RAW
            });
            
            res.status(200).send(results);
        } catch (error) {
            res.status(500).json({
                status: 'failure',
                message: error
            });
        }
    },

    update : async (req, res) => {
        let body = req.body;
        if(!body || !body.column || !body.value || !body.id){
            res.status(500).json({
                status: 'no data provided',
                message: 'no data provided'
            });
            return;
        }

        // will only allow updating status column and severity column
        if(body.column !== 'status' && body.column !== 'severity'){
            res.status(401).json({
                info: 'wrong column',
            });

            return;
        }

        try {
            const [results, metadata] = 
            await dbs.query("update CrisisReports set " + body.column + " = :val where id = :id", {
                type : QueryTypes.UPDATE,
                replacements : {
                    val : body.value,
                    id : body.id
                }
            });
            
            console.log(metadata);
            res.status(200).send(results);
        } catch (error) {
            res.status(500).json({
                status: 'failure',
                message: error
            });;
        }
    },
}