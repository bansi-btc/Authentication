const express=require('express');
const app=express();

require('dotenv').config();

const PORT=process.env.PORT || 3000;
const cookieParser=require('cookie-parser');

app.use(cookieParser());

app.use(express.json());

let dbConnect=require('./config/database');
dbConnect();

// route import and mount
const user=require('./routes/user');

app.use('/api/v1', user);

app.listen(PORT, ()=>{
    console.log(`App is listening at ${PORT}`);
})
