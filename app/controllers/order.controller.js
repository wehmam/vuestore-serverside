const db = require('../models/index')
const Order = db.orders

exports.findOrder = (req, res) => {
    const id = Number(req.params.id)
    Order.aggregate([{
        $match: {
            user_id: id
        }
    }, {
        $lookup: {
            from: "products",
            localField: "cart_items",
            foreignField: "code",
            as: "products"
        }
    }])
    .then((result) => {
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        // Add base url on first image url
        result[0].products.forEach(product => {
            product.imageUrl = `${baseUrl}${product.imageUrl}`
        })
        
        res.send(result)
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Error while retrieving products."
        })
    })
} 

exports.addToCart = (req, res) => {
    const id = Number(req.params.id)
    const productCode = String(req.body.product)

    Order.updateOne({
        user_id: id
    }, {
        // menghindari didalam array code product yang sama (duplicate)
        $addToSet: {
            cart_items : productCode
        }
    })
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(500).send({
            message: err.message
        })
    })
}

exports.removeFromCart = (req, res) => {
    const id = Number(req.params.id)
    const productCode = String(req.params.product)

    Order.updateOne({
        user_id: id
    }, {
        $pull: {
            cart_items: productCode
        }
    }).then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(500).send({
            message: err.message
        })
    })
}