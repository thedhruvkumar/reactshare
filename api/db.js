const mongoose = require('mongoose')

async function connectDB() {
  try {
    mongoose.connect("mongodb+srv://admin:admin@prodb.8gnxpze.mongodb.net/reactshare?retryWrites=true&w=majority", {
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