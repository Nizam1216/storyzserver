const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const dbConnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongoDb", mongoose.connection.host);
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnection;
