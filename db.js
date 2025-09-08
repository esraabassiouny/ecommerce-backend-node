const mongoose = require("mongoose"); 

const mongoUri = process.env.MONGO_URI;

const connectDB = mongoose
  .connect(mongoUri)
  .then(() => {
    console.log(" DB CONNECTED Successfully ");
  })
  .catch((err) => {
    console.log(err.message);
  });

module.exports = connectDB;