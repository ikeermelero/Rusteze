import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Garage = sequelize.define(
  "Talleres",
  {
    id_taller: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    address: {
      type: DataTypes.STRING(255),
    },
    city: {
      type: DataTypes.STRING(100),
    },
    phone: {
      type: DataTypes.STRING(20),
    },
    gmail: {
      type: DataTypes.STRING(100),
    },
  },
  {
    tableName: "talleres",
    timestamps: false,
  },
);



export default Garage;
