const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ClienteSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    cpf: { type: String, required: true, unique: true },
    idade: { type: Number, required: true },
    tempoCliente: { type: Number, required: true },
    senha: { type: String, required: true }
});

ClienteSchema.pre('save', async function (next) {
    if (this.isModified('senha') || this.isNew) {
        this.senha = await bcrypt.hash(this.senha, 8);
    }
    next();
});

ClienteSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.senha);
};

const Cliente = mongoose.model('Cliente', ClienteSchema);
module.exports = Cliente;