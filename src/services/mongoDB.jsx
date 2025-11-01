import mongoose from "mongoose";

let connectionPromise = null;

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection;
    }

    if (mongoose.connection.readyState === 2) {
      if (connectionPromise) {
        await connectionPromise;
        return mongoose.connection;
      }
    }

    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI no está definido en las variables de entorno");
    }

    connectionPromise = mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
    });

    await connectionPromise;
    console.log("Conexión a MongoDB exitosa");
    
    return mongoose.connection;
  } catch (error) {
    console.error("Error conectando a MongoDB:", error);
    connectionPromise = null; 
    throw error;
  }
};

export default connectDB;
