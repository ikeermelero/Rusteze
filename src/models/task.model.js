import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

  const Task = sequelize.define('Task', {
    id_tareas: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_repair: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.INTEGER, // Mecánico asignado
    },
    name: {
      type: DataTypes.STRING(100),
    },
    description: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.STRING(50),
    },
    estimated_time: {
      type: DataTypes.INTEGER,
    },
    cost: {
      type: DataTypes.DECIMAL(12, 2),
    },
  }, {
    tableName: 'tasks',
    timestamps: false,
  });


export default Task;