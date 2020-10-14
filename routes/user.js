const express = require('express');
const route = express.Router();

const {verifyJWT_MW} = require('./middleware');
const {addData,Delete,UpdateData,getData} = require('../controller/user');


route.post('/userId',verifyJWT_MW , addData);
route.delete('/delete/:userId/:keluargaId',verifyJWT_MW,Delete);
route.put('/update/:userId/:keluargaId',verifyJWT_MW,UpdateData);
route.get('/getData',verifyJWT_MW,getData);

module.exports = route;