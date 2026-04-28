const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URL|| "mongodb://127.0.0.1:27017/WS_Backend";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB konektatuta");
  } catch (error) {
    console.error("MongoDB errorea:", error.message);
    process.exit(1);
  }
};

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB deskonektatuta");
});

module.exports = connectDB;
