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
            await dbs.query(`
                Select c.id, location, severity, incident , user_id as volunteer_id, u.name as assigned, is_resolved
                from CrisisReports c 
                left join users u on c.user_id = u.id 
                where c.user_id is not null`, {
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

    // get all
    getAll : async (req, res) => {
        try {
            const [results, metadata] = 
            await dbs.query("Select id, location, severity, is_resolved, incident, user_id from CrisisReports", {
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
    
    getSpecific : async (req, res) => {
        let body = req.query;

        // if payload doesn't contain appropriate data, then return error
        if(!body || !body.ids){
            res.status(400).json({
                message: 'no data provided'
            });
            return;
        }

        // making user the payload contains only comma separated integers
        if(!body.ids.split(',').map(val => val.trim()).every(val => Number.isInteger(Number(val)) && val !== ''))
        {
            res.status(400).json({
                message: 'malformed data provided'
            });
            return;
        }
        
        try {
            const [results, metadata] = 
            await dbs.query(`
                select id, location, severity, status, incident, user_id from CrisisReports
                where id in (${body.ids})`, {
                type : QueryTypes.RAW,
            });
            
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({
                message: error
            });;
        }
    },

    update : async (req, res) => {
        let body = req.body;
        if(!body || !body.column || !body.value || !body.id){
            res.status(400).json({
                message: 'no data provided'
            });
            return;
        }

        // will only allow updating is_resolved column and severity column
        if(body.column !== 'is_resolved' && body.column !== 'severity'){
            res.status(400).json({
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
            
            res.status(200).send(results);
        } catch (error) {
            res.status(500).json({
                status: 'failure',
                message: error
            });;
        }
    },

    assignVolunteer : async (req, res) => {
        let body = req.body;
        console.log(body);
        if(!body || !body.crisis_id || !body.user_id){
            res.status(500).json({
                message: 'no data provided'
            });
            return;
        }

        try {
            const [results, metadata] = 
            await dbs.query(`UPDATE CrisisReports SET user_id = :uid where id = :cid`, {
                type : QueryTypes.UPDATE,
                replacements : {
                    uid : body.user_id,
                    cid : body.crisis_id
                }
            });
            
            res.status(200).send(results);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: error
            });;
        }
    },
}