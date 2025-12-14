const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const maquinaRoutes = require("./routes/maquinas");
const ordemRoutes = require("./routes/oredemServico");
const usuarioRoutes = require("./routes/usuario");

const app = express();
const porta = process.env.PORT || 10000;

const allowedPatterns = [
  /^https:\/\/monitoramento-maquinas-.*\.vercel\.app$/
];

app.use(cors({
  origin: (origin, callback) => {
    // Permite chamadas sem origin (Postman, health check)
    if (!origin) return callback(null, true);

    // Normaliza a origin
    const normalizedOrigin = origin.replace(/\/$/, "");

    const isAllowed = allowedPatterns.some(pattern =>
      pattern.test(normalizedOrigin)
    );

    if (isAllowed) {
      return callback(null, true);
    }

    console.error("🚫 Origin bloqueada pelo CORS:", origin);
    return callback(null, false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado ao MongoDB"))
  .catch(err => console.error("❌ Erro MongoDB:", err));

app.use("/api/maquinas", maquinaRoutes);
app.use("/api/ordens", ordemRoutes);
app.use("/api/usuarios", usuarioRoutes);

app.use((err, req, res, next) => {
  console.error("🔥 ERRO GLOBAL:", err);
  res.status(500).json({ message: "Erro interno do servidor" });
});

app.listen(porta, () => {
  console.log(`🚀 Servidor rodando na porta ${porta}`);
});
