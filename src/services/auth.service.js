import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { userModel } from '../models/index.js'

// Definimos las funciones del servicio
const getUserByEmail = async (email) => {
    // Esto busca en tu base de datos usando el modelo
    return await userModel.findOne({ where: { email } }); 
};




export default {
    getUserByEmail,
    // Agrega aquí las demás funciones que definas
};