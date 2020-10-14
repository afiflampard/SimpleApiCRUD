const {errorHandler} = require('../helpers/dbErrorhandler');
const {getId} = require('./util');
const expressJwt = require('express-jwt');
const db = require('../connection');
const bcrypt = require('bcrypt');
const knex = require('../connection');
//const saltaround = 10;
require('dotenv').config();


exports.addData = async (req,res) => {
    let {kk,alamat} = req.body;
    const id_user = req.user.user_id;
    console.log(id_user);
    await db('keluarga').insert({
        id_user:id_user,
        kk : kk,
        alamat : alamat,
    })
    res.status(200).end();
}

exports.Delete = async (req,res) => {
    const id_user =req.user.user_id;
    const id_params = req.params.userId;
    if(id_user==id_params){
        await knex('keluarga').select().where({
            'id_user' : id_user,
            'id' : req.params.keluargaId
        }).del();

        res.status(200).end();
    }else{
        res.status(401).json({
            message : "Data tidak berhasil dihapus"
        })
    }
}

exports.UpdateData = async (req,res) =>{
    let{kk,alamat} = req.body;
    const id_user =req.user.user_id;
    const id_params = req.params.userId;
    if(id_user==id_params){
        await knex('keluarga').where({
            'id_user' : id_user,
            'id' : req.params.keluargaId
        })
        .update({
            'kk' : kk,
            'alamat' : alamat
        });
        res.status(200).end();
    }else{
        res.status(401).json({
            message : "Data tidak bisa diupdate"
        })
    }

}

exports.getData = async (req,res) =>{
    const id_user = req.user.user_id;
    try{
        const user = await knex('user').join('keluarga','user.id','=','keluarga.id_user')
        .select('user.nama','user.email','keluarga.kk','keluarga.alamat').where({
            'user.id' : id_user 
        })
        res.status(200).json(user)
    }catch(err){
        res.status(404).json({
            message : err
        })
    }
      
}