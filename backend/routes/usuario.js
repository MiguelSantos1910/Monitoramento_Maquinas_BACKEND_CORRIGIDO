const express = require('express');
const Usuario = require('../models/Usuarios');
const router = express.Router();

router.post('/cadastrar-usuario', async(req, res) =>{
    try{
        const { nome, email, senha } = req.body;
        const novoUsuario = await Usuario.create({ nome, email, senha });
        res.status(201).json(novoUsuario)
    }catch(err){
        res.status(400).json({ error: err.message });
    }
});

router.post('/login', async(req, res) =>{
    try{
        const { email, senha } = req.body;
        const usuario = await Usuario.findOne({ email, senha });
        if(!usuario){
            return res.status(401).json({ message: "Credenciais inválidas."});
        }
        res.json({ message: "Login bem-sucedido.", usuario });
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});

router.get('/lista-usuarios', async(req, res) =>{
    try{
        const usuarios = await Usuario.find();
        res.json(usuarios);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});
router.get('/:id', async(req, res) =>{
    try{
        const usuarios = await Usuario.findById(req.params.id);
        if(!usuarios){
            return res.status(404).json({ message: "Usuário não encontrado."});
        }
        res.json(usuarios)
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});
router.delete('/:id', async(req, res) =>{
    try{
        const usuariosDeletado = await Usuario.findByIdAndDelete(req.params.id); 
        if(!usuariosDeletado){
            return res.status(404).json({ message: "Usuário não encontrado."});
        }
        res.json({ message: "Usuário deletado com sucesso!" });
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;