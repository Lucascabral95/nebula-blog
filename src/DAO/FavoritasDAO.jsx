import mongo from "@/services/mongoDB";
import Favoritas from "@/models/Favoritas";

class FavoritasDAO {
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

    async createFavorita(favorita) {
        try {
            await this.ensureConnection();
            const result = await Favoritas.create(favorita);
            return result;
        } catch (error) {
            console.error("Error al crear la favorita:", error);
            throw error;
        }
    }

    async getFavoritasByUser(id) {
        try {
            await this.ensureConnection();
            const favoritas = await Favoritas.findOne({ user: id }).populate("post");
            return favoritas;
        } catch (error) {
            console.error("Error al obtener las favoritas:", error);
            throw error;
        }
    }

    async addPostToFavoritas(user, post) {
        try {
            await this.ensureConnection();
            const result = await Favoritas.updateOne({ user: user }, { $push: { post: post } });
            return result;
        } catch (error) {
            console.error("Error al agregar el post a las favoritas:", error);
            throw error;
        }
    }

    async deletePostFromFavoritaByUserAndPostId(user, postId) {
        try {
            await this.ensureConnection();
            const result = await Favoritas.updateOne({ user: user }, { $pull: { post: postId } });
            return result;
        } catch (error) {
            console.error("Error al eliminar el post de las favoritas:", error);
            throw error;
        }
    }
}

const favoritasDAO = new FavoritasDAO();

export default favoritasDAO;