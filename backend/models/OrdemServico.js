const mongoose = require('mongoose');
const OrdemServicoSchema = mongoose.Schema({
    nome: {type: String, required: true},
    modelo: {type: String, required: true},
    serie: {type: String, required: true},
    setor: {type: String, required: true},
    status: {type: String, required: true},
    descricao: {type: String},
    data: {type: Date, required: true}
});
module.exports = mongoose.model("OS", OrdemServicoSchema);