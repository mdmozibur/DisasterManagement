const dbs = require('../config/dbs');
const { QueryTypes } = require('sequelize');

module.exports = {
    post : async (req, res) => {
        let body = req.body;
        if(!body){
            res.status(500).json({
                status: 'no data provided',
                message: 'no data provided'
            });;
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
            
            console.log(metadata);
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
            
            console.log(metadata);
            res.status(200).send(results);
        } catch (error) {
            res.status(500).json({
                status: 'failure',
                message: error
            });;
        }
    }
}