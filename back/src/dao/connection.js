const mongoose = require('mongoose');

module.exports.dbConnection = async () => {
    try {
        console.log(process.env.URL_MONGODB);
        let resp = await mongoose.connect(process.env.URL_MONGODB,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true
            });
        console.log('Successfully: ', resp.now());
    } catch (err) {
        console.log(err);
        throw err;
    }
}