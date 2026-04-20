import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Repair = sequelize.define(
  "Repairs",
  {
    id_repair: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_car: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(50),
    },
    diagnosis: {
      type: DataTypes.TEXT,
    },
    total_cost: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0.0,
    },
    state_dates: {
      type: DataTypes.DATEONLY,
    },
    end_date: {
      type: DataTypes.DATEONLY,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "repairs",
    timestamps: false,
  },
);


export default Repair;
