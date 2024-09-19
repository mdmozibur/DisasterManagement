const dbs = require('../config/dbs');
const { QueryTypes } = require('sequelize');

module.exports = {
    post : async (req, res) => {
        let body = req.body;
        if(!body){
            console.log('no data provided for donate route');
            res.status(500).json({
                status: 'no data provided',
                message: 'no data provided'
            });;
            return;
        }

        try {
            const [results, metadata] = 
            await dbs.query('insert into Donations (amount, donor_name, donor_address) values (:amnt, :name, :addr)', {
                replacements : {
                    amnt : body.amount,
                    name : body.donor_name,
                    addr : body?.donor_address ?? null
                },
                type : QueryTypes.INSERT
            });
            
            res.send(results);
        } catch (error) {
            console.log('error : ' + error);
            res.status(500).json({
                status: 'failure',
                message: error
            });;
        }
    },

    getAll : async (req, res) => {
        try {
            const [results, metadata] = 
            await dbs.query("Select id, created_at, amount, donor_name, donor_address from Donations", {
                type : QueryTypes.RAW
            });
            
            res.status(200).send(results);
        } catch (error) {
            res.status(500).json({
                status: 'failure',
                message: error
            });;
        }
    },
    
    getAllTime : async (req, res) => {
        try {
            const [results, metadata] = 
            await dbs.query("Select sum(amount) as total from Donations", {
                type : QueryTypes.SELECT
            });
            
            res.status(200).send(results);
        } catch (error) {
            res.status(500).json({
                status: 'failure',
                message: error
            });;
        }
    },

    getDaywise : async (req, res) => {
        try {
            const [results, metadata] = 
            await dbs.query("select date(created_at) as date, sum(amount) as sum from donations group by 1 ", {
                type : QueryTypes.RAW
            });
            
            res.status(200).send(results);
        } catch (error) {
            res.status(500).json({
                status: 'failure',
                message: error
            });;
        }
    },
}