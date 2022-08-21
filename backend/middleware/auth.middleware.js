const jwt = require('jsonwebtoken');

// Permet de vérifier le token envoyé par le frontend
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        }
        next()
    } catch (error) {
        res.status(401).json({ error: 'Requête non authentifiée'});
    }
};