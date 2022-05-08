const mongoose = require('mongoose')

async function connectDB() {
  try {
    mongoose.connect("mongodb://127.0.0.1:27017/myapp", {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    console.log("connected to db");
  } catch (error) {
    console.log("MongoDB Connection Error")
  }
  process.on('unhandledRejection', error => {
    console.log('unhandledRejection', error);
  });
}

module.exports = connectDB;