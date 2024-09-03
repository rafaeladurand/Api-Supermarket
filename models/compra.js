const mongoose = require('mongoose');


const itemCompraSchema = new mongoose.Schema({
    produto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Produto',
        required: true
    },
    quantidade: {
        type: Number,
        required: true
    },
    precoUnitario: {
        type: Number,
        required: true
    },
    precoTotal: {
        type: Number,
        required: true
    }
});


const compraSchema = new mongoose.Schema({
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },
    itens: [itemCompraSchema],
    precoTotal: {
        type: Number,
        required: true
    },
    dataCompra: {
        type: Date,
        default: Date.now
    }
});

const Compra = mongoose.model('Compra', compraSchema);

module.exports = Compra;