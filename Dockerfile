FROM node:14
WORKDIR /app
COPY ./crud-rest-nodejs-mongodb/back .
COPY ./crud-rest-nodejs-mongodb/back/src/.env .
RUN npm install
EXPOSE 3000
CMD ["node", "./src/main.js"]