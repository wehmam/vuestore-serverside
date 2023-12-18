const db = require('../models/index')
const Product = db.products


exports.findAll = (req, res) => {
    Product.find()
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.status(500).send({
                message: err.message 
            })
        });
}