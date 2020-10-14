const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');

//import routes
const AuthRoutes = require('./routes/auth')
const UserRoutes = require('./routes/user')

require('dotenv').config({path:'./env'});
const port = process.env.PORT || 8000;

const db = require('./connection');
const morgan = require('morgan');

app.get('/api',(req,res)=>{
    res.json({
        success: 1,
        message : "Hello World"
    })
})


//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());



//routes middleware
app.use('/api',AuthRoutes);
app.use('/api',UserRoutes);


app.listen(port,()=>{
    console.log(`Server is running at ${port}`);
})