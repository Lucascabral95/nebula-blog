import mongo from "@/services/mongoDB";
import Comment from "@/models/Comment";

class CommentDAO {
    constructor() {
        this.dbInitialized = false;
        this.initializeDB();
    }

    async initializeDB() {
        try {
            if (this.dbInitialized) return;

            await mongo();
            this.dbInitialized = true;
        } catch (error) {
            console.error("Error al conectar a la base de datos:", error);
            throw error;
        }
    }

    async ensureConnection() {
        if (!this.dbInitialized) {
            await this.initializeDB();
        }
    }

    async getCommentsByPostID(id) {
        try {
            await this.ensureConnection();
            const comments = (await Comment.find({ post: id }).populate("user"));
            return comments;
        } catch (error) {
            console.error("Error al obtener los comentarios:", error);
            throw error;
        }
    }

    async createComment(comment) {
        try {
            await this.ensureConnection();
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
            await this.ensureConnection();
            const result = await Comment.deleteOne({ _id: id });
            return result;
        } catch (error) {
            console.error("Error al eliminar el comentario:", error);
            throw error;
        }
    }

    async updateCommentById(id) {
        try {
            await this.ensureConnection();
            const result = await Comment.updateOne({ _id: id}, { $inc: { likes: 1 } });
            return result;
        } catch (error) {
            console.error("Error al actualizar el comentario:", error);
            throw error;
        }
    }
}

const commentDAO = new CommentDAO();

export default commentDAO;