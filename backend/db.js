const mongoose = require("mongoose");

const url = "mongodb+srv://techstudent304_db_user:shivam123@cluster0.mou5xse.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(" Database connected successfully");
  } catch (err) {
    console.error(" Database connection failed:", err.message);
  }
};

module.exports = connectDB;

