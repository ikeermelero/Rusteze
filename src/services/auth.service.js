import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { userModel } from '../models/index.js'


const getUserByEmail = async (email) => {
  
    return await userModel.findOne({ where: { email } }); 
};




export default {
    getUserByEmail,

};