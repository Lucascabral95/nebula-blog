// import mongoose from "mongoose";

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGODB_URI);
//         console.log("MongoDB connected");
//     } catch (error) {
//         console.error(error);
//     }
// }

// export default connectDB;
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState === 1) {
      console.log("Ya conectado a MongoDB");
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      bufferCommands: false,
    });

    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error conectando a MongoDB:", error);
    throw error;
  }
};

export default connectDB;
