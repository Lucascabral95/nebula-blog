import mongo from "@/services/mongoDB";
import Category from "@/models/Category.jsx";

class CategoryDAO {
    constructor() {
        this.inizializeDB();
    }

    async inizializeDB() {
        try {
            await mongo();
            console.log("Conexión a MongoDB exitosa"); 
        } catch (error) {
            console.error("Error al conectar a la base de datos:", error);
            throw error;
        }
    }

    async createCategory(category) {
        try {
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
            const result = await Category.find();

            return result;
        } catch (error) {
            console.log("Error al obtener las categorias", error)
            throw error
        }
    }

    async getCategoryById(id) {
        try {
            const result = await Category.findById(id)

            return result;
        } catch (error) {
            console.error("Error al obtener la categoría:", error);
            throw error;
        }
    }

    async getCategoryByName(name) {
        try {
            const result = await Category.findOne({ name });

            return result;
        } catch (error) {
            console.error("Error al obtener la categoría:", error);
            throw error;
        }
    }
}

export default new CategoryDAO;