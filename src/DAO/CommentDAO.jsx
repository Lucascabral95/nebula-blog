import mongo from "@/services/mongoDB";
import Comment from "@/models/Comment";

class CommentDAO {
    constructor() {
        this.initializeDB();
    }

    async initializeDB() {
        try {
            await mongo();
        } catch (error) {
            console.error("Error al conectar a la base de datos:", error);
            throw error;
        }
    }

    async getCommentsByPostID(id) {
        try {
            const comments = (await Comment.find({ post: id }).populate("user"));
            return comments;
        } catch (error) {
            console.error("Error al obtener los comentarios:", error);
            throw error;
        }
    }

    async createComment(comment) {
        try {
            const newComment = new Comment(comment);
            const result = await newComment.save();
            return result;
        } catch (error) {
            console.error("Error al crear el comentario:", error);
            throw error;
        }
    }

    async deleteCommentById(id) {
        try {
            const result = await Comment.deleteOne({ _id: id });
            return result;
        } catch (error) {
            console.error("Error al eliminar el comentario:", error);
            throw error;
        }
    }

    async updateCommentById(id) {
        try {
            const result = await Comment.updateOne({ _id: id}, { $inc: { likes: 1 } });
            return result;
        } catch (error) {
            console.error("Error al actualizar el comentario:", error);
            throw error;
        }
    }
}

export default new CommentDAO();