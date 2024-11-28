import mongo from "@/services/mongoDB";
import Post from "@/models/Post"

class PostDAO {
    constructor() {
        this.inizializeDB();
    }

    async inizializeDB() {
        try {
            await mongo();
        } catch (error) {
            console.error("Error al conectar a la base de datos:", error);
            throw error;
        }
    }

    async getPosts() {
        try {
            const posts = await Post.find({}).populate("author", "_id name email avatar createdAt");
            return posts.reverse();
        } catch (error) {
            console.error("Error al obtener los posts:", error);
        }
    }

    async createPost(post) {
        try {
            const result = await Post.create(post);

            return result;
        } catch (error) {
            console.error("Error al crear el post:", error);
        }
    }

    async getPostById(id) {
        try {
            const post = await Post.findOne({ _id: id });
            return post;
        } catch (error) {
            console.error("Error al obtener el post:", error);
        }
    }

    async getPostBySlug(slug) {
        try {
            const post = await Post.findOne({ slug });
            return post;
        } catch (error) {
            console.error("Error al obtener el post:", error);
        }
    }

    async deletePostBySlug(slug) {
        try {
            const result = await Post.deleteOne({ slug });
            return result;
        } catch (error) {
            console.error("Error al eliminar el post:", error);
        }
    }

    async deletePostById(id) {
        try {
            const result = await Post.deleteOne({ _id: id });
            return result;
        } catch (error) {
            console.error("Error al eliminar el post:", error);
        }
    }

    async updatePostById(id) {
        try {
            const result = await Post.updateOne({ _id: id }, { $inc: { likes: 1 } });
            return result;
        } catch (error) {
            console.error("Error al actualizar el post:", error);
        }
    }
}

export default new PostDAO;