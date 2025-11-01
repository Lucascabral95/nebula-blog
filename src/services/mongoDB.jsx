import mongoose from "mongoose";

// Global connection promise to handle concurrent connection attempts
let connectionPromise = null;

const connectDB = async () => {
  try {
    // If already connected, return immediately
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection;
    }

    // If connection is in progress, wait for it
    if (mongoose.connection.readyState === 2) {
      if (connectionPromise) {
        await connectionPromise;
        return mongoose.connection;
      }
    }

    // Validate environment variable
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI no está definido en las variables de entorno");
    }

    // Create new connection promise
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
    connectionPromise = null; // Reset on error
    throw error;
  }
};

export default connectDB;
