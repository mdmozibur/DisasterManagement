const dbs = require('../config/dbs');
const { QueryTypes } = require('sequelize');

module.exports = {
    get : async (req, res) => {
        try {
            const [results, metadata] = 
            await dbs.query('select id, product_name, available_qantity, unit_price from inventory', {
                type : QueryTypes.RAW
            });
            console.log(results);
            res.send(results);
        } catch (error) {
            console.log('error : ' + error);
            res.status(500).json({
                message: error
            });
        }
    },

    getDaywiseExpense : async (req, res) => {
        try {
            const [results, metadata] = 
            await dbs.query(`
                        select date(po.created_at) as date, sum(po.quantity * i.unit_price) as expense
                        from purchase_orders po 
                        join inventory i on po.inventory_id = i.id 
                        group by 1`, {
                type : QueryTypes.RAW
            });
            
            res.send(results);
        } catch (error) {
            res.status(500).json({
                message: error
            });;
        }
    },

    getAvailableBalance : async (req, res) => {
        try {
            const [results, metadata] = 
            await dbs.query(`select donated - expense as balance
                            from
                            (
                            select sum(amount) as donated from donations 
                            ),
                            (
                            select sum(po.quantity * i.unit_price) as expense
                            from purchase_orders po 
                            join inventory i on po.inventory_id = i.id
                            )`, {
                type : QueryTypes.SELECT
            });
            
            res.send(results);
        } catch (error) {
            res.status(500).json({
                message: error
            });;
        }
    },

    purchase : async (req, res) => {
        let body = req.body;
        product = Number(body.product);
        qty = Number(body.qty);

        if(!body || !product || !qty){
            res.status(400).json({
                message: 'no data provided'
            });
            return;
        }

        if(!Number.isInteger(product)){
            res.status(400).json({
                message: 'wrong data provided'
            });
            return;
        }

        try {
            const [results, metadata] = 
            await dbs.query(
                `insert into purchase_orders (inventory_id, quantity) values (:inv, :qty);
                 update inventory set available_qantity = available_qantity + :qty where id = :inv`, {
                type : QueryTypes.RAW ,
                replacements : {
                    inv : product,
                    qty : qty
                }
            });
            
            res.status(200).json({
                message : 'purchase successful'
            });
        } catch (error) {
            res.status(500).json({
                message: error
            });;
        }
    },
}