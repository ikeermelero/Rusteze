import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { userModel } from '../models/index.js'

const getUserByEmail = async (email) => {
    return await userModel.findOne({ where: { email: email } }); 
};

async function login(email, password) {
    const user = await getUserByEmail(email); 
    console.log("Auth Service - Usuario encontrado:", user);
    if (!user) {
        throw new Error("Credenciales incorrectas- ");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordCorrect) {
        throw new Error("Credenciales incorrectas - contraseña incorrecta");
    }
    return user;
}

async function register(userData) {
    const { name, surname, email, password_hash, phone } = userData
    try {
        //const hashedPassword = await bcrypt.hash(password, 10);
        const userCreated = await userModel.create({
            name, surname, email, password_hash, phone,
            id_role: 1,
            id_taller: 1
        })
        return userCreated
    } catch (error) {
        console.error('Error al crear usuario:', error)
        throw new Error('Error al registrarse. Posible email duplicado.') // ← throw en vez de res
    }
}

async function createToken(user){
    return jwt.sign(
            { id: user.id_user, rol: user.id_role, id_taller: user.id_taller },
            process.env.JWT_SECRET,
        )
}

export default {
    getUserByEmail,
    login,
    register,
    createToken,
};