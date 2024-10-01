const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UsuarioSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    cpf: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    avatar: { type: String, default: '' }
});

UsuarioSchema.pre('save', async function (next) {
    console.log('Verificando se a senha foi modificada ou se o usuário é novo.');
    
    if (this.isModified('senha') || this.isNew) {
        console.log('Senha modificada ou usuário novo, criptografando...');
        this.senha = await bcrypt.hash(this.senha, 8);
    } else {
        console.log('Senha não foi modificada, não será criptografada.');
    }
    next();
});

UsuarioSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.senha);
};

const Usuario = mongoose.model('Usuario', UsuarioSchema);
module.exports = Usuario;

