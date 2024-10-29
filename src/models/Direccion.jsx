import mongoose from "mongoose";

const DireccionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    localidad: {
        type: String,
        required: true
    },
    partido: {
        type: String,
        required: true
    },
    provincia: {
        type: String,
        required: true
    },
    pais: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.models.Direccion || mongoose.model("Direccion", DireccionSchema)