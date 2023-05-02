const mongoose = require("mongoose");
require("dotenv").config()

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.bd
    );
    console.log("database is connected");
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectdb;
