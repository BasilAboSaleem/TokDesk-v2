const mongoose = require("mongoose");

const connectDB = async () => {
  try {
<<<<<<< HEAD
    await mongoose.connect(process.env.DATABASE_URL);
=======
    await mongoose.connect(process.env.MONGO_URL);
>>>>>>> 2c5a1538b45e98d3d7ba8312b271876486a634e1
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
<<<<<<< HEAD
  } 
=======
  }
>>>>>>> 2c5a1538b45e98d3d7ba8312b271876486a634e1
};

module.exports = connectDB;
