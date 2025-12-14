const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const maquinaRoutes = require("./routes/maquinas");
const ordemRoutes = require("./routes/oredemServico");
const usuarioRoutes = require("./routes/usuario");

const app = express();
const porta = process.env.PORT || 10000;

const allowedOrigins = [
  "https://monitoramento-maquinas-frontend.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // Permite chamadas sem origin (Postman, backend)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado ao MongoDB"))
  .catch(err => console.error("❌ Erro ao conectar ao MongoDB:", err));

app.use("/api/maquinas", maquinaRoutes);
app.use("/api/ordens", ordemRoutes);
app.use("/api/usuarios", usuarioRoutes);

app.listen(porta, () => {
  console.log(`🚀 Servidor rodando na porta ${porta}`);
});
