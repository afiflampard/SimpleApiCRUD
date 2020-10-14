const express = require('express');
exports.signupValidator = (req,res,next)=>{
    req.check('nama','Name is required').notEmpty();
    req.check('email',"Email harus terdiri dari 3 sampai 32 karakter")
    .matches(/.+\@.+\..+/)
    .withMessage('Email harus mengandung @')
    .isLength({
        min:4,
        max:32
    })
    req.check('password','Password harus diisi').notEmpty();
    req.check('password')
    .isLength({
        min:8,
        max:32
    })
    .withMessage('Password harus mengandung 8 karakter')
    .matches(/\d/)
    .withMessage('Password harus mengandung angka');

    const errors = req.validationErrors();
    console.log(errors);
    if(errors){
        const firstError = errors.map(error=>error.msg)[0];
        return res.status(400).json({
            error:firstError
        });
    }
    next();
}

exports.UpdateValidator = (req,res,next)=>{
    req.check('email',"Email harus terdiri dari 3 sampai 32 karakter")
    .matches(/.+\@.+\..+/)
    .withMessage('Email harus mengandung @')
    .isLength({
        min:4,
        max:32
    })
    req.check('password','Password harus diisi').notEmpty();
    req.check('password')
    .isLength({
        min:8,
        max:32
    })
    .withMessage('Password harus mengandung 8 karakter')
    .matches(/\d/)
    .withMessage('Password harus mengandung angka');

    const errors = req.validationErrors();
    console.log(errors);
    if(errors){
        const firstError = errors.map(error=>error.msg)[0];
        return res.status(400).json({
            error:firstError
        });
    }
    next();
}