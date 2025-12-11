const express = require('express');
const OS = require('../models/OrdemServico');
const router = express.Router();

router.post('/cadastrar-os', async(req, res) =>{
    try{
        const { nome, modelo, serie, setor, status, descricao, data: dataManutencao } = req.body;
        const novaOS = await OS.create({ nome, modelo, serie, setor, status, descricao, data: dataManutencao });
        res.status(201).json(novaOS);
    }catch(err){
        res.status(400).json({ error: err.message });
    }
});
router.get('/consultar-os', async(req, res) =>{
    try{
        const os = await OS.find();
        res.json(os);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});
router.get('/:id', async(req, res) =>{
    try{
        const os = await OS.findById(req.params.id);
        if(!os){
            return res.status(404).json({ message: "Ordem não encontrada."});
        }
        res.json(os);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async(req, res) =>{
    try{
        const id = req.params.id;
        const dadosAtualizados = req.body;
    
        const osAtualizada = await OS.findByIdAndUpdate(
            id,
            dadosAtualizados,
            { new: true } 
        );
    
        if(!osAtualizada){
            return res.status(404).json({ message: "Máquina não encontrada."});
        }
        res.json(osAtualizada);
    }catch(err){
        res.status(400).json({ error: err.message }); 
    }
});

router.delete('/:id', async(req, res) =>{
    try{
        const os = await OS.findByIdAndDelete(req.params.id);
        if(!os){
            return res.status(404).json({ message: "Ordem não encontrada."});
        }
        res.json({ message: "Ordem deletada com sucesso!" });
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;