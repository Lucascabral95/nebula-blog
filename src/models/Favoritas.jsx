import mongoose from "mongoose";

const favoritasSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    post: [{ type: mongoose.Schema.Types.ObjectId, ref: "post", required: true }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.models.Favoritas || mongoose.model("Favoritas", favoritasSchema)