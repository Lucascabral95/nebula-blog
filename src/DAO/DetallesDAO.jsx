import mongo from "@/services/mongoDB";
import Detalles from "@/models/Detalles";

class DetallesDAO {
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

    async createDetalles(detalles) {
        try {
            await this.ensureConnection();
            const newDetalles = new Detalles(detalles);
            const result = await newDetalles.save();
            return result;
        } catch (error) {
            console.error("Error al crear los detalles:", error);
            throw error;
        }
    }

    async getDetallesById(id) {
        try {
            await this.ensureConnection();
            const result = await Detalles.findOne({ user: id });
            return result;
        } catch (error) {
            console.error("Error al obtener los detalles:", error);
            throw error;
        }
    }

    async updateDetallesById(id, detalles) {
        try {
            await this.ensureConnection();
            const result = await Detalles.updateOne({ user: id }, detalles);
            return result;
        } catch (error) {
            console.error("Error al actualizar los detalles:", error);
            throw error;
        }
    }

    async deleteDetallesById(id) {
        try {
            await this.ensureConnection();
            const result = await Detalles.deleteOne({ user: id });
            return result;
        } catch (error) {
            console.error("Error al eliminar los detalles:", error);
            throw error;
        }
    }
}

const detallesDAO = new DetallesDAO();

export default detallesDAO;