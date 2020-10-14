const express = require('express');
const route = express.Router();

const{signup,signin,UpdateUser} = require('../controller/auth');
const {verifyJWT_MW} = require('./middleware');

const{signupValidator,UpdateValidator} = require('../validator/index');

route.post('/signup',signupValidator,signup);
route.post('/signin',signin);

route.put('/updateUser/:iduser',verifyJWT_MW, UpdateValidator ,UpdateUser)



module.exports = route;