import mongo from "@/services/mongoDB";
import User from "@/models/User";
import bcrypt from "bcrypt";

class UserDAO {
    constructor() {
        this.initializeDB();
    }

    async initializeDB() {
        try {
            await mongo();
        } catch (error) {
            console.error("Error al conectar a la base de datos:", error);
            throw error;
        }
    }

    async createUser(user) {
        try {
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
            const user = await User.findOne({ email: email });
            return user;
        } catch (error) {
            console.error("Error al buscar usuario:", error);
            throw error;
        }
    }

    async validatePassword(passwordCredentials, password) {
        try {
            const isMatch = await bcrypt.compare(passwordCredentials, password);
            return isMatch;
        } catch (error) {
            console.error("Error al validar la contraseña:", error);
            throw error;
        }
    }
}

export default new UserDAO(); 