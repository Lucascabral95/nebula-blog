import mongo from "@/services/mongoDB";
import Category from "@/models/Category.jsx";

class CategoryDAO {
    constructor() {
        this.dbInitialized = false;
        this.initializeDB();
    }

    async initializeDB() {
        try {
            if (this.dbInitialized) return;

            await mongo();
            this.dbInitialized = true;
            console.log("Conexión a MongoDB exitosa"); 
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

    async createCategory(category) {
        try {
            await this.ensureConnection();
            const categoriaNueva = new Category(category);
            const result = await categoriaNueva.save();

            return result;
        } catch (error) {
            console.error("Error al crear la categoría:", error);
            throw error;
        }
    }

    async getCategories() {
        try {
            await this.ensureConnection();
            const result = await Category.find();

            return result;
        } catch (error) {
            console.log("Error al obtener las categorias", error)
            throw error
        }
    }

    async getCategoryById(id) {
        try {
            await this.ensureConnection();
            const result = await Category.findById(id)

            return result;
        } catch (error) {
            console.error("Error al obtener la categoría:", error);
            throw error;
        }
    }

    async getCategoryByName(name) {
        try {
            await this.ensureConnection();
            const result = await Category.findOne({ name });

            return result;
        } catch (error) {
            console.error("Error al obtener la categoría:", error);
            throw error;
        }
    }
}

const categoryDAO = new CategoryDAO();

export default categoryDAO;