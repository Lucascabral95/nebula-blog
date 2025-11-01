import mongo from "@/services/mongoDB";
import Tag from "@/models/Tag";

class TagDAO {
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

    async createTag(tag) {
        try {
            await this.ensureConnection();
            const newTag = new Tag(tag);
            const result = await newTag.save();
            return result;
        } catch (error) {
            console.error("Error al crear el tag:", error);
            throw error;
        }
    }

    async getTags() {
        try {
            await this.ensureConnection();
            const tags = await Tag.find();
            return tags;
        } catch (error) {
            console.error("Error al obtener los tags:", error);
            throw error;
        }
    }

    async deleteTagById(id) {
        try {
            await this.ensureConnection();
            const result = await Tag.deleteOne({ _id: id });
            return result;
        } catch (error) {
            console.error("Error al eliminar el tag:", error);
            throw error;
        }
    }
}

const tagDAO = new TagDAO();

export default tagDAO;