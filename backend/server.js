const express = require('express');
const cors = require('cors');
require('dotenv').config();
const MONGO = process.env.MONGO_URI;
const mongoose = require('mongoose');
const maquinaRoutes = require('../backend/routes/maquinas');
const ordemRoutes = require('../backend/routes/oredemServico');
const usuarioRoutes = require('../backend/routes/usuario')
const app = express();
const porta = process.env.PORT || 1000;
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: 'GET, PUT, DELETE, POST',
    credentials: true
}));
app.use(express.json());
mongoose
    .connect(MONGO)
    .then(() => console.log("Conectado ao MongoDB"))
    .catch((err) => console.error("Erro ao conectar:", err));
app.use('/api/maquinas', maquinaRoutes);
app.use('/api/ordens', ordemRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});