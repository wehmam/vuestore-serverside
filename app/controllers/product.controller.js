const db = require('../models/index')
const Product = db.products



exports.findAll = (req, res) => {
    Product.find()
        .then((result) => {
            const baseUrl = `${req.protocol}://${req.get('host')}`;
            const modifiedProduct = result.map(product => ({
                ...product.toObject(),
                id: product._id,
                imageUrl: `${baseUrl}${product.imageUrl}`
            }))

            res.send(modifiedProduct);
        }).catch((err) => {
            res.status(500).send({
                message: err.message 
            })
        });
}

exports.findOne = (req, res) => {
    Product.findOne({
        code : req.params.id
    })
    .then((result) => {
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const modifiedProduct = {
            ...result.toObject(),
            id: result.id,
            imageUrl : `${baseUrl}${result.imageUrl}`
        }

        res.send(modifiedProduct);
    }).catch((err) => {
        res.status(500).send({
            message: err.message 
        })
    });
}