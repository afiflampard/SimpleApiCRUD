const {verifyJWTToken} = require('../controller/util')

function verifyJWT_MW(req, res, next) {
   const {authorization} = req.headers
   const [,token] = authorization.split(' ');
    verifyJWTToken(token).then((decodedToken) => {
        req.user = decodedToken;
        next();
    }).catch((err) => {
        res.status(400).json({ message: err || "Token kadaluarsa" });
    });
}

module.exports = {verifyJWT_MW};