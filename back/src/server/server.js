let { dbConnection } = require('../dao/connection');

let express = require('express');
let app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

module.exports = {
    app,
    server: async () => {
        try {
            await generarJWT();
            await middlewares();
            await swagger();
            await start();
        } catch (err) {
            console.log(err);
        }
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

async function swagger() {
    const options = {
        definition: {
            openapi: "3.1.0",
            info: {
                title: "Express Rest NodeJS MongoDB 2023",
                version: "1.0.0",
                description: "Esto es un CRUD API hecho con Express y documentado con Swagger",
                license: {
                    name: "MIT",
                    url: "https://spdx.org/licenses/MIT.html",
                },
                contact: {
                    name: "Edgar Ojeda",
                    url: "http://localhost:3000/api/hola-mundo",
                    email: "info@email.com",
                },
            },
            servers: [
                {
                    url: "http://localhost:3000/api",
                },
            ],
        },
        apis: ["./services/*.js"],
    };

    const swaggerDocument = swaggerJsdoc(options);
    app.use('/open-api', swaggerUi.serve, swaggerUi.setup(swaggerDocument,
        {
            explorer: true,
            customCssUrl: "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-material.css",
        }));
}