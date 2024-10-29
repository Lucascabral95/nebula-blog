import mongo from "@/services/mongoDB";
import Tag from "@/models/Tag";

class TagDAO {
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

    async createTag(tag) {
        try {
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
            const tags = await Tag.find();
            return tags;
        } catch (error) {
            console.error("Error al obtener los tags:", error);
            throw error;
        }
    }

    async deleteTagById(id) {
        try {
            const result = await Tag.deleteOne({ _id: id });
            return result;
        } catch (error) {
            console.error("Error al eliminar el tag:", error);
            throw error;
        }
    }
}