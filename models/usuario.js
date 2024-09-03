const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UsuarioSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    cpf: { type: String, required: true, unique: true },
    senha: { type: String, required: true }
});

UsuarioSchema.pre('save', async function (next) {
    if (this.isModified('senha') || this.isNew) {
        this.senha = await bcrypt.hash(this.senha, 8);
    }
    next();
});

UsuarioSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.senha);
};

const Usuario = mongoose.model('Usuario', UsuarioSchema);
module.exports = Usuario;
