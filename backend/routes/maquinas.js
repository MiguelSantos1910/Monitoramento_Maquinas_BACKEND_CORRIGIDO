const express = require('express');
const Maquina = require('../models/Maquinas');
const router = express.Router();

router.post('/cadastrar-maquinas', async(req, res) =>{
    try{
        const { nome, modelo, serie, setor, status } = req.body;
        const novaMaquina = await Maquina.create({ nome, modelo, serie, setor, status });
        res.status(201).json(novaMaquina);
    }catch(err){
        res.status(400).json({ error: err.message });
    }
});
router.get('/lista-maquinas', async(req, res) =>{
    try{
        const maquina = await Maquina.find();
        res.json(maquina);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});
router.get('/:id', async(req, res) =>{
    try{
        const maquina = await Maquina.findById(req.params.id);
        if(!maquina){
            return res.status(404).json({ message: "Máquina não encontrada."});
        }
        res.json(maquina);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async(req, res) =>{
    try{
        const id = req.params.id;
        const dadosAtualizados = req.body;

        const maquinaAtualizada = await Maquina.findByIdAndUpdate(
            id,
            dadosAtualizados,
            { new: true } 
        );

        if(!maquinaAtualizada){
            return res.status(404).json({ message: "Máquina não encontrada."});
        }
        res.json(maquinaAtualizada);
    }catch(err){
        res.status(400).json({ error: err.message }); 
    }
});

router.delete('/:id', async(req, res) =>{
    try{
        const maquinaDeletada = await Maquina.findByIdAndDelete(req.params.id);
        if(!maquinaDeletada){
            return res.status(404).json({ message: "Máquina não encontrada."});
        }
        res.json({ message: "Máquina deletada com sucesso!"});
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;