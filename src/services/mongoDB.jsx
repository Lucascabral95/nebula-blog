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
    // Check if already connected
    if (mongoose.connection.readyState === 1) {
      console.log("Ya conectado a MongoDB");
      return;
    }

    // Check if connecting
    if (mongoose.connection.readyState === 2) {
      console.log("Conectando a MongoDB...");
      return;
    }

    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI no está definido en las variables de entorno");
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
