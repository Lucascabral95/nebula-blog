import mongo from "@/services/mongoDB";
import Bio from "@/models/Bio";
import PostDAO from "./PostDAO";

class BioDAO {
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

    async createBio(bio) {
        try {
            await this.ensureConnection();
            const result = await Bio.create(bio);
            return result;
        } catch (error) {
            console.error("Error al crear el bio:", error);
            throw error;
        }
    }

    async getBioById(id) {
        try {
            await this.ensureConnection();
            const result = await Bio.findOne({ user: id });
            return result;
        } catch (error) {
            console.error("Error al obtener el bio:", error);
            throw error;
        }
    }

    async updateBioById(id, bio) {
        try {
            await this.ensureConnection();
            const result = await Bio.updateOne({ user: id }, bio);
            return result;
        } catch (error) {
            console.error("Error al actualizar el bio:", error);
            throw error;
        }
    }

    async deleteBioById(id) {
        try {
            await this.ensureConnection();
            const result = await Bio.deleteOne({user: id });
            return result;
        } catch (error) {
            console.error("Error al eliminar el bio:", error);
            throw error;
        }
    }

    async getBioFromPostAuthor(id) {
        try {
            await this.ensureConnection();
            const post = await PostDAO.getPostById(id);
            const result = await Bio.findOne({ user: post.author });
            return result;
        } catch (error) {
            console.error("Error al obtener el bio:", error);
            throw error;
        }
    }
}

const bioDAO = new BioDAO();

export default bioDAO;