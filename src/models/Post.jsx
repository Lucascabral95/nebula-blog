import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: [
        { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
    ],
    categories: {
        type: String,
        required: true
    },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    status: {
        type: String,
        enum: ["draft", "published"],
        default: "draft"
    },
    likes: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.models.post || mongoose.model("post", postSchema) 