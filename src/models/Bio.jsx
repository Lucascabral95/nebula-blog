import mongoose from "mongoose";

const BioSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    nombreCompleto: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    pronombres: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.models.Bio || mongoose.model("Bio", BioSchema)