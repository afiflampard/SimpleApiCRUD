const {errorHandler} = require('../helpers/dbErrorhandler');
const {createJWToken,getId} = require('./util');
const expressJwt = require('express-jwt');
const db = require('../connection');
const bcrypt = require('bcrypt');
const knex = require('../connection');
const saltaround = 10;
require('dotenv').config();


exports.signup = async (req,res)=>{
    let checkRegistered = await db.first().from('user')
    .where('email',req.body.email);
    let password = bcrypt.hashSync(req.body.password,saltaround);
    if(checkRegistered){
        res.status(409).json('Email Sudah ada');
    }else{
        await db('user').insert({
            email :req.body.email?req.body.email : undefined,
            password :password,
            nama : req.body.nama
        });
        res.status(200).end();
    }
}

exports.signin = async (req,res) => {
    let {email,password} = req.body;
   // let pass = await db.select('password').from('user').where('email',email);
   try{
    const userResult = await db('user').first().where('email',email)
    console.log(userResult)
    if(!userResult){
        res.status(404).json({
            message : "User tidak ditemukan"
        })
    }
    const pass = bcrypt.compare(password,userResult.password)
    if(!pass){
        res.status(401).json({
            message : "Password Salah"
        })
    }
    const token = await createJWToken({
        user_id : userResult.id,
        user_email : userResult.email,
        user_nama : userResult.nama

    });

    console.log(token);
    res.status(200).json({
        success : true,
        token : token
    })
 
   }catch(err){
       console.log(err)
       res.status(500).json({
           message:err
       })
   }
}

exports.UpdateUser = async (req,res) =>{
    let {email,password,nama} = req.body;
    const id_user =req.user.user_id;
    const id_params = req.params.iduser;
    if(id_user==id_params){
        await knex('user').where({
            'id' : id_user
        })
        .update({
            'nama' : nama, 
            'email' : email,
            'password' : bcrypt.hashSync(password,saltaround)
        });
        res.status(200).end();
    }else{
        res.status(401).json({
            message: "Data tidak bisa diupdate"
        })
    }
}

// exports.requireSignIn = expressJwt({
//     secret : process.env.JWT_SECRET,
//     userProperty : "auth",
//     algorithms: ['sha1', 'RS256', 'HS256'],
// });