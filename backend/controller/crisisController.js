const dbs = require('../config/dbs');
const { QueryTypes } = require('sequelize');

module.exports = {
    post : async (req, res) => {
        let body = req.body;
        console.log(req.body);

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
            });;
        }
    }
}