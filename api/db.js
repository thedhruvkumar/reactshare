const mongoose = require('mongoose')

async function connectDB(){
    try {
        mongoose.connect("mongodb://localhost:27017/usersdb", {
          useUnifiedTopology: true,
          useNewUrlParser: true
        });
        console.log("connected to db");
      } catch (error) {
        console.log("MongoDB Connection Error")
      }
      process.on('unhandledRejection', error => {
        console.log('unhandledRejection', error.message);
      }); 
}

module.exports = connectDB;