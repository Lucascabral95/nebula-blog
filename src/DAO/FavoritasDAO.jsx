import mongo from "@/services/mongoDB";
import Favoritas from "@/models/Favoritas";

class FavoritasDAO {
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

    async createFavorita(favorita) {
        try {
            const result = await Favoritas.create(favorita);
            return result;
        } catch (error) {
            console.error("Error al crear la favorita:", error);
            throw error;
        }
    }

    async getFavoritasByUser(id) {
        try {
            const favoritas = await Favoritas.findOne({ user: id }).populate("post");
            return favoritas;
        } catch (error) {
            console.error("Error al obtener las favoritas:", error);
            throw error;
        }
    }

    async addPostToFavoritas(user, post) {
        try {
            const result = await Favoritas.updateOne({ user: user }, { $push: { post: post } });
            return result;
        } catch (error) {
            console.error("Error al agregar el post a las favoritas:", error);
            throw error;
        }
    }

    async deletePostFromFavoritaByUserAndPostId(user, postId) {
        try {
            const result = await Favoritas.updateOne({ user: user }, { $pull: { post: postId } });
            return result;
        } catch (error) {
            console.error("Error al eliminar el post de las favoritas:", error);
            throw error;
        }
    }
}

export default new FavoritasDAO();