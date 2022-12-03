const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://aarya191102:Aarya123@cluster0.97lz8u4.mongodb.net/?retryWrites=true&w=majority';

const connectToMongo =()=>{
    mongoose.connect(mongoURI)
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));
}


module.exports = connectToMongo;