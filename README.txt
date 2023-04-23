Es un servicio REST con NodeJS y MongoDB. 

Para ocuparlo seguir los siguientes pasos:

1. Verificar que la BD en MongoDB Atlas este operativa.

    URL: https://account.mongodb.com/account/login?nds=true&_ga=2.100066142.1722820833.1680208711-647890857.1612417880&_gac=1.47624533.1680275670.Cj0KCQjwiZqhBhCJARIsACHHEH88Y2cbt0rOapntKTTJn3gsO1wwbu_olErukN22lgNJZo4RlSUR8_YaAv-OEALw_wcB

2. Realizar un clone del proyecto desde GitHub.

3. Instalar los modulos necesarios:

    $ npm i 

4. Ubicar las credenciales y otras variables de la url de mongo, se encuentran en mongoDB Atlas, en Cluster, Connect your Application, sustituir en el archivo .env:

    URL_MONGODB=mongodb+srv://{username}:{password}@{cluster}.mongodb.net/{collection}?retryWrites=true&w=majority

5. Ejecutar el archivo main.js:

    node main.js    or      nodemon.js

6. El API tiene seguridad basica token JWT generada con la libreria jsonwebtoken, solo para efectos de prueba.

El log del levantamiento del server arroja un token jwt con 1 hora de expiracion para agregarlo como Authorization en los metodos del API.

7. Utilizar los servicios configurados en el puerto 3000:

GET - http://localhost:3000/api/fechas/actual
GET - http://localhost:3000/api/hola-mundo
GET - http://localhost:3000/api/param/cualquier%20informacion
GET - http://localhost:3000/api/query?query1=valor1&query2=valor2
GET - http://localhost:3000/api/all
GET - http://localhost:3000/api/id/6079136cf17044c6d2830e91
POST - http://localhost:3000/api/personas
{
  "nombre": "Ibrayn",
  "age": 17,
  "estado": true
}

PUT - http://localhost:3000/api/id/6073b49a5893e105ec417c96
{
    "nombre": "Nombre",
    "age": 28,
    "estado": "false"
}

    NOTA: El PUT funciona para cualquier campo individual si se desea enviarlo asi.

DELETE - http://localhost:3000/api/id/607a38d365968f7c2c836a43

8. Incluye Dockerfile para construir nuestra imagen Docker. Posicionarnos al nivel del archivo Dockerfile y ejecutar el comando:

    $ docker build -t crud-rest-nodejs-mongodb-docker-2023 .
