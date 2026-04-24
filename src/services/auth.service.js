import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { userModel } from '../models/index.js'


const getUserByEmail = async (email) => {
  
    return await userModel.findOne({ where: { email } }); 
};

export async function login(email, password) {
    const user = await getUserByEmail(email); 
    if (!user) {
        throw new Error("Credenciales incorrectas");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordCorrect) {
        throw new Error("Credenciales incorrectas");
    }
    return user;
}

export async function register(userData) {
    const { name, surname, email, password, phone } = userData;
    try {
        const userCreated = await userModel.create({
            name,
            surname,
            email,
            password_hash, 
            phone,
            id_role: 2,    
            id_taller: 1 
        });        
        return userCreated;
        
    } catch (error) {
        console.error("Error al crear usuario:", error);
        
        res.status(500).send("Error al registrarse. Posible email duplicado.");
    }
}


export default {
    getUserByEmail,
    login,
    register

};