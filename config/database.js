const mongoose=require('mongoose');

require('dotenv').config();

const dbConnect=()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{console.log("DB connection successfull")})
    .catch((err)=>{console.log("Error in db connection")});
}

module.exports=dbConnect;