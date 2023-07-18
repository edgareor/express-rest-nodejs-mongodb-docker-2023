Es un servicio REST con NodeJS y MongoDB. 

Para ocuparlo seguir los siguientes pasos:

1. Verificar que la BD en MongoDB Atlas con credenciales GMAIL este operativa.

    URL: https://account.mongodb.com/account/login

2. Realizar un clone del proyecto desde GitHub.

3. Acceder al directorio del proyecto y carpeta /back, Instalar los modulos necesarios con el comando:

    $ npm i 

4. Ubicar las credenciales y otras variables de la url de mongo, la url se encuentra en mongoDB Atlas, en Cluster, Connect your Application, 
Drivers, y la password en Database Access, Edit User. sustituir en el archivo .env:

    URL_MONGODB=mongodb+srv://{username}:{password}@{cluster}.mongodb.net/{database}?retryWrites=true&w=majority

5. Acceder al directorio /src y ejecutar el archivo main.js:

    node main.js    or      nodemon.js

6. El API tiene seguridad basica token JWT generada con la libreria jsonwebtoken, solo para efectos de prueba.

El log del levantamiento del server arroja un token jwt con 1 hora de expiracion para agregarlo como Authorization en los metodos del API.

7. Utilizar los servicios configurados en el puerto 3000:

GET - http://localhost:3000/api/fechas/actual   - NO Tiene seguridad para verificar funcionamiento de la API.
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
    
 Una vez construida la imagen levantar el contenedor con el comando:
 
    $ docker run -p 3000:3000 crud-rest-nodejs-mongodb-docker-2023

9. Incluye Kubernetes.yml para desplegar nuestra imagen sobre Kubernetes, tiene HPA(Autoscaling), Service y Deployment. Clonar proyecto posicionarse a nivel donde se 
encuentre el archivo, modificar el nombre de la imagen de nuestro respositorio personal y ejecutar el comando:

    $ kubectl apply -f Kubernetes.yml

  Luego el se debe consumir el servicio por el puerto 5152, se modifico para pruebas de diferenciacion.

  NOTA: Si se quiere destruir los recursos creados es con: $ kubectl delete -f Kubernetes.yml
