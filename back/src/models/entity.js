const { Schema, model } = require('mongoose');
const ObjectId = Schema.ObjectId;

const personaSchema = Schema({
    _id: ObjectId,
    nombre: String,
    age: Number,
    estado: Boolean
}, { versionKey: false });

module.exports.Persona = model('objetos', personaSchema);
