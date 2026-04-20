import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Role = sequelize.define(
  "Roles",
  {
    id_role: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    priority: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "roles",
    timestamps: false,
  },
);

export default Role;
