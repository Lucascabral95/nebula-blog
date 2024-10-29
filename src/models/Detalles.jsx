import mongoose from "mongoose";

const DetallesSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    email: {
        type: String,
        required: true
    },
    celular: {
        type: Number,
        required: true
    }, 
    fechaNacimiento: {
        type: String,
        required: true
    },
    genero: {
        type: String,
        required: true
    },
    linkeding: {
        type: String
    },
    github: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.models.Detalles || mongoose.model("Detalles", DetallesSchema)