const ProductService = require('../../services/web/ProductService')

const ProductController = {
    list: async function (req, res) {
        const result = await ProductService.list({ id: req.params.id })
        
        res.send({
            ActionType: 'OK',
            data: result
        })
    }
}

module.exports = ProductController