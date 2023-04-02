let { server } = require('./server/server');
require('dotenv').config();

let main = async () => {
    try {
        await server();
    } catch (err) {
        console.log(err);
    }
}

main();