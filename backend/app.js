const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET, PUT, DELETE, POST',
    credentials: true
}));
app.use(express.json());

// Rotas
const maquinaRoutes = require("./routes/maquinas");
const usuarioRoutes = require("./routes/usuario");

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/maquinas", maquinaRoutes);

export default app;