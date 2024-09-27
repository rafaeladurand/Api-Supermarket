const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const produtoResource = require('./resources/produto-resource');
const usuarioResource = require('./resources/usuario-resource');
const clienteResource = require('./resources/cliente-resource');
const compraResource = require('./resources/compra-resource');
const authResource = require('./resources/auth-resource')
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({   
    extended: true
}));

const PORT = 3001; 


mongoose.connect('mongodb://localhost:27017/supermercado', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});


app.use('/produto', produtoResource);
app.use('/usuario', usuarioResource);
app.use('/cliente', clienteResource);
app.use('/auth', authResource)
app.use('/compra', compraResource);


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
