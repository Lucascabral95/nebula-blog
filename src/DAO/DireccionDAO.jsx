import mongo from "@/services/mongoDB";
import Direccion from "@/models/Direccion";

class DireccionDAO {
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

    async createDireccion(direccion) {
        try {
            const nuevaDireccion = new Direccion(direccion);
            const result = await nuevaDireccion.save();
            return result;
        } catch (error) {
            console.error("Error al crear la dirección:", error);
            throw error;
        }
    }

    async getDireccionById(id) {
        try {
            const result = await Direccion.findOne({ user: id });
            return result;
        } catch (error) {
            console.error("Error al obtener la dirección:", error);
            throw error;
        }
    }

    async updateDireccionById(id, direccion) {
        try {
            const result = await Direccion.updateOne({ user: id }, direccion);
            return result;
        } catch (error) {
            console.error("Error al actualizar la dirección:", error);
            throw error;
        }
    }

    async deleteDireccionById(id) {
        try {
            const result = await Direccion.deleteOne({ user: id });
            return result;
        } catch (error) {
            console.error("Error al eliminar la dirección:", error);
            throw error;
        }
    }
}

export default new DireccionDAO();