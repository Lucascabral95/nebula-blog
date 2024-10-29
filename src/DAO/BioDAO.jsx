import mongo from "@/services/mongoDB";
import Bio from "@/models/Bio";

class BioDAO {
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

    async createBio(bio) {
        try {
            const result = await Bio.create(bio);
            return result;
        } catch (error) {
            console.error("Error al crear el bio:", error);
            throw error;
        }
    }

    async getBioById(id) {
        try {
            const result = await Bio.findOne({ user: id });
            return result;
        } catch (error) {
            console.error("Error al obtener el bio:", error);
            throw error;
        }
    }

    async updateBioById(id, bio) {
        try {
            const result = await Bio.updateOne({ user: id }, bio);
            return result;
        } catch (error) {
            console.error("Error al actualizar el bio:", error);
            throw error;
        }
    }

    async deleteBioById(id) {
        try {
            const result = await Bio.deleteOne({user: id });
            return result;
        } catch (error) {
            console.error("Error al eliminar el bio:", error);
            throw error;
        }
    }
}

export default new BioDAO();