const { Schema, model } = require('mongoose');
const ObjectId = Schema.ObjectId;

const personaSchema = Schema({
    _id: ObjectId,
    nombre: {
        type: String,   // Si se ingresa un dato numerico, se realizara un cast automatico a tipo String
        required: [true, 'Mensaje en caso de no ingresar un nombre'],
        unique: false
    },
    age: {
        type: Number,   // Si se ingresa un dato de tipo String, trata de hacer un cast automatico a Number.
        min: 12,
        max: 100
    },
    estado: {
        type: Boolean,
        default: true
    },
}, { versionKey: false });

module.exports.Persona = model('objetos', personaSchema);
