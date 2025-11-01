import mongo from "@/services/mongoDB";
import User from "@/models/User";
import bcrypt from "bcrypt";

class UserDAO {
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

    async createUser(user) {
        try {
            await this.ensureConnection();
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
            const newUser = new User(user);

            const result = await newUser.save();
            return result;
        } catch (error) {
            console.error("Error creando usuario:", error);
            throw error;
        }
    }

    async findUserByEmail(email) {
        try {
            await this.ensureConnection();
            const user = await User.findOne({ email: email });
            return user;
        } catch (error) {
            console.error("Error al buscar usuario:", error);
            throw error;
        }
    }

    async getUserById(id) {
        try {
            await this.ensureConnection();
            const user = await User.findOne({ _id: id });
            return user;
        } catch (error) {
            console.error("Error al buscar usuario:", error);
            throw error;
        }
    }

    async validatePassword(passwordCredentials, password) {
        try {
            await this.ensureConnection();
            const isMatch = await bcrypt.compare(passwordCredentials, password);
            return isMatch;
        } catch (error) {
            console.error("Error al validar la contraseña:", error);
            throw error;
        }
    }
}

const userDAO = new UserDAO(); 

export default userDAO;