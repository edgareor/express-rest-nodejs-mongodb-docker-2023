const { Router } = require('express');
const { verifyToken } = require('./verifyToken');
const { body, check, validationResult } = require('express-validator');
const router = Router();
let mongoose = require('mongoose');

let { Persona } = require('../models/entity');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     TokenAuth:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 */
  
/**
 * @swagger
 * /timenow:
 *   get:
 *     summary: Retorna fecha actual
 *     description: Retorna fecha actual
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Fecha Actual
 */
router.get('/timenow',
    [],
    async (req, res) => {
        try {
            var date = new Date();
            res.status(200).json({ "message": date });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    });

/**
 * @swagger
 * /hola-mundo:
 *   get:
 *     summary: Retorna Hola Mundo
 *     description: Retorna hola mundo
 *     security:
 *       - TokenAuth: []
 *     responses:
 *       200:
 *         description: Hola Mundo
 */
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

/**
 * @swagger
 * /personas:
 *   post:
 *     summary: Guardar Persona
 *     description: Guardar Persona
 *     security:
 *       - TokenAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: nombre
 *         description: Nombre persona.
 *         in: body
 *         required: true
 *         type: string
 *       - name: age
 *         description: Edad persona.
 *         in: body
 *         required: true
 *         type: number
 *       - name: estado
 *         description: Habilitado.
 *         in: body
 *         required: true
 *         type: boolean
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/personas',
    [
        verifyToken,
        body('nombre').custom(async (nombre) => {
            console.log(typeof nombre);
            if (typeof nombre != 'string') {
                throw new Error('El nombre debe ser una cadena');
            }
        })
    ],
    async (req, res) => {
        try {
            //Validacion
            const errors = validationResult(req);				// Debemos obtener los resultados de la validacion y procesarlos.
            if (!errors.isEmpty()) {					        // Si el objeto errors contiene algun dato, retornar el error.
                return res.status(400).json(errors);
            }

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

/**
 * @swagger
 * /id/{id}:
 *   put:
 *     summary: Actualizar Persona
 *     description: Actualizar Persona
 *     security:
 *       - TokenAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: ID de la persona.
 *         in: path
 *         required: true
 *         type: string
 *       - name: nombre
 *         description: Nombre persona.
 *         in: body
 *         required: true
 *         type: string
 *       - name: age
 *         description: Edad persona.
 *         in: body
 *         required: true
 *         type: number
 *       - name: estado
 *         description: Habilitado.
 *         in: body
 *         required: true
 *         type: boolean
 *     responses:
 *       200:
 *         description: Updated
 */
router.put('/id/:id',
    [
        verifyToken,
        check('nombre', 'El nombre debe ser minimo 2 caracteres y maximo 20').isLength({ min: 2, max: 20 })
    ],
    async (req, res) => {
        try {
            //Validacion
            const errors = validationResult(req);				// Debemos obtener los resultados de la validacion y procesarlos.
            if (!errors.isEmpty()) {					        // Si el objeto errors contiene algun dato, retornar el error.
                return res.status(400).json(errors);
            }

            let id = req.params.id;
            let body = req.body;
            let responseUpdate = await Persona.findByIdAndUpdate(id, body, { new: true });
            res.status(200).json(responseUpdate);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    })

/**
 * @swagger
 * /id/{id}:
 *   delete:
 *     summary: Eliminar Persona
 *     description: Eliminar Persona
 *     security:
 *       - TokenAuth: []
 *     parameters:
 *       - name: id
 *         description: ID de la persona.
 *         in: path
 *         required: true
 *         type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Deleted
 */
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