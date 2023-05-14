const { Router } = require('express');
const { verifyToken } = require('./verifyToken');
const router = Router();
let mongoose = require('mongoose');

let { Persona } = require('../models/entity');

router.get('/hola-mundo',
    [verifyToken],
    async (req, res) => {
        try {
            res.status(200).json({ message: `Hello World! ${req.method}` })			// ${req.method} extrae el tipo de metodo utilizado.
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    });

router.get('/fechas/actual',
    [verifyToken],
    async (req, res) => {
        try {
            var date = new Date();
            res.status(200).json({ "message": date });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    });

router.get('/param/:param',
    [verifyToken],
    async (req, res) => {
        try {
            var params = req.params.param						// Extraer path param ingresado. Nomenclatura: req.params.<nombre-parametros>
            res.status(200).send({ "message": params });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

router.get('/query',
    [verifyToken],
    async (req, res) => {
        try {
            var query1 = req.query.query1						// Extraer un query param. Nomenclatura: req.query.nombre-queryparams.
            var query2 = req.query.query2
            var response = {
                "query1": query1,
                "query2": query2
            }
            res.status(200).json(response);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    });

router.get('/all',
    [verifyToken],
    async (req, res) => {
        try {
            let responseAll = await Persona.find();
            res.status(200).json(responseAll);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    })

router.get('/id/:id',
    [verifyToken],
    async (req, res) => {
        try {
            let id = req.params.id;
            let responseId = await Persona.findById(id);
            res.status(200).json(responseId);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    })

router.post('/personas',
    [verifyToken],
    async (req, res) => {
        try {
            let body = req.body;
            body._id = new mongoose.Types.ObjectId();
            let persona = new Persona(body);
            let responseSave = await persona.save();
            res.status(201).json(responseSave);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    })

router.put('/id/:id',
    [verifyToken],
    async (req, res) => {
        try {
            let id = req.params.id;
            let body = req.body;
            let responseUpdate = await Persona.findByIdAndUpdate(id, body, { new: true });
            res.status(200).json(responseUpdate);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    })

router.delete('/id/:id',
    [verifyToken],
    async (req, res) => {
        try {
            let id = req.params.id;
            let responseDelete = await Persona.findByIdAndDelete(id);
            res.status(200).json({ message: 'Usuario: ' + id + ', eliminado correctamente', responseDelete: responseDelete });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    })

module.exports = router;