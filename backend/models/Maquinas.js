const mongoose = require('mongoose');
const MaquinasSchema = mongoose.Schema({
    nome: {type: String, required: true},
    modelo: {type: String, required: true},
    serie: {type: String, required: true},
    setor: {type: String, required: true},
    status: {type: String, required: true}
});
module.exports = mongoose.model('Maquina', MaquinasSchema);