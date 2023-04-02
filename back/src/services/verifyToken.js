let jwt = require('jsonwebtoken');

module.exports.verifyToken = async (req, res, next) => {
    try {
        const user = await jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
        if (user) {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: 'Token no valido' });
    }
}