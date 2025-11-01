import mongo from "@/services/mongoDB";
import Direccion from "@/models/Direccion";

class DireccionDAO {
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

    async createDireccion(direccion) {
        try {
            await this.ensureConnection();
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
            await this.ensureConnection();
            const result = await Direccion.findOne({ user: id });
            return result;
        } catch (error) {
            console.error("Error al obtener la dirección:", error);
            throw error;
        }
    }

    async updateDireccionById(id, direccion) {
        try {
            await this.ensureConnection();
            const result = await Direccion.updateOne({ user: id }, direccion);
            return result;
        } catch (error) {
            console.error("Error al actualizar la dirección:", error);
            throw error;
        }
    }

    async deleteDireccionById(id) {
        try {
            await this.ensureConnection();
            const result = await Direccion.deleteOne({ user: id });
            return result;
        } catch (error) {
            console.error("Error al eliminar la dirección:", error);
            throw error;
        }
    }
}

const direccionDAO = new DireccionDAO();

export default direccionDAO;