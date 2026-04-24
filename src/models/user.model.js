import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define(
  "User",
  {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID_USER' // <--- Esto le dice a Sequelize que en SQL es ID_USER
    },
    id_role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'ID_ROLE'
    },
    id_taller: {
      type: DataTypes.INTEGER,
      field: 'ID_TALLER'
    },
    name: {
      type: DataTypes.STRING(100),
      field: 'NAME'
    },
    surname: {
      type: DataTypes.STRING(100),
      field: 'SURNAME'
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      field: 'EMAIL'
    },
    password_hash: {
      type: DataTypes.STRING(255),
      field: 'PASSWORD_HASH'
    },
    phone: {
      type: DataTypes.STRING(20),
      field: 'PHONE'
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'CREATED_AT'
    },
  },
  {
    tableName: "users", // Sequelize buscará "users" (minúsculas), asegúrate que en Postgres coincida
    timestamps: false,
  },
);

export default User;