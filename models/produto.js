const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    precoAtual: {
        type: Number,
        required: true
    },
    precoPromocao: {
        type: Number,
        required: false  
    },
    tipo: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: false  
    },
    dataValidade: {
        type: Date,
        required: false  
    },
    image: {
        type: String, 
        required: true
      }
}, { timestamps: true }); 


const Produto = mongoose.model('Produto', produtoSchema);

module.exports = Produto;
