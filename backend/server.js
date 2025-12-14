const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const maquinaRoutes = require('../backend/routes/maquinas');
const ordemRoutes = require('../backend/routes/oredemServico');
const usuarioRoutes = require('../backend/routes/usuario');

const app = express();
const porta = process.env.PORT || 10000;

app.use(cors({
  origin: "https://monitoramento-maquinas-frontend.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch(err => console.error("Erro ao conectar:", err));

app.use('/api/maquinas', maquinaRoutes);
app.use('/api/ordens', ordemRoutes);
app.use('/api/usuarios', usuarioRoutes);

app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});


