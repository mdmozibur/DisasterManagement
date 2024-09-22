const dbs = require('../config/dbs');
const authController = require('./authController');
const { QueryTypes } = require('sequelize');

module.exports = {
    getVolunteers : async (req, res) => {
        var authResult = await authController.checkToken(req.body.token);

        try {
            const [results, metadata] = 
            await dbs.query(`
                select u.id, phone, u.name ${authResult.is_valid && authResult.is_admin ? ', u.is_verified' : ''} , array_agg(c.id) as assigned_crisises
                from users u 
                left join crisisreports c on u.id = c.user_id
                where is_admin = false
                ${authResult.is_valid && authResult.is_admin ? '' : 'and is_verified = true'}
                group by 1, 2, 3 ${authResult.is_valid && authResult.is_admin ? ', 4' : ''}`, {
                type : QueryTypes.RAW,
            });
            
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({
                message: error
            });
        }
    },

    verify : async (req, res) => {
        var authResult = await authController.checkToken(req.body.token);

        // only allow admins to verify volunteers
        if(!authResult.is_valid || !authResult.is_admin){
            res.status(401).json({
                message: 'Not authorized'
            });
            return;
        }
        
        let body = req.body;
        if(!body || !body.user_id){
            res.status(400).json({
                message: 'No data provided'
            });
            return;
        }


        try {
            const [results, metadata] = 
            await dbs.query(`update users set is_verified = true where id = :uid`, {
                type : QueryTypes.UPDATE,
                replacements : {
                    uid : body.user_id,
                }
            });
            
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({
                message: error
            });
        }
    },
}