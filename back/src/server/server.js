let { dbConnection } = require('../dao/connection');

let express = require('express');
let app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');

module.exports.server = async () => {
    try {
        await generarJWT();
        await middlewares();
        await start();
    } catch (err) {
        console.log(err);
    }
}

async function middlewares() {
    await dbConnection();
    app.use(express.json());
    app.use(cors());
}

async function start() {
    app.use('/api', require('../services/services'));
    //app.use('/api', jwt({ secret: process.env.SECRET_KEY }));
    app.listen(process.env.PORT, () => console.log(`Servidor escuchando en puerto ${process.env.PORT}`));
}

async function generarJWT() {
    const user = { id: 1, name: 'Edgar Ojeda', email: 'eeor@example.com' };
    const token = await jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '1h' });
    console.log("Copiar token para consumir API: ", token);
}