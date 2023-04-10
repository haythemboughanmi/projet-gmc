const mongoose = require("mongoose");
const connectdb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://projet-gmc:gomycode@cluster0.kmhktow.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("database is connected");
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectdb;
