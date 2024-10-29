import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    bio: {
        type: String
    },
    avatar: {
        type: String
    },
    role: {
        type: String,
        enum: [
            "admin", "author", "reader"
        ]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.models.User || mongoose.model("User", userSchema);