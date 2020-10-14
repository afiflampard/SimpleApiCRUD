let jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyJWTToken(token) {
   // console.log(token);
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err || !decodedToken) {
                return reject(err);
                
            }
            resolve(decodedToken);
        });
    });
}

async function createJWToken(data) {
    return jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}

function getId(id){
    return id;
}

module.exports = {
    createJWToken,
    verifyJWTToken
    
}