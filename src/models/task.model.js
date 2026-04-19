import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

  const Task = sequelize.define('Task', {
    ID_TAREAS: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ID_REPAIR: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ID_USER: {
      type: DataTypes.INTEGER, // Mecánico asignado
    },
    NAME: {
      type: DataTypes.STRING(100),
    },
    DESCRIPTION: {
      type: DataTypes.TEXT,
    },
    STATUS: {
      type: DataTypes.STRING(50),
    },
    ESTIMATED_TIME: {
      type: DataTypes.INTEGER,
    },
    COST: {
      type: DataTypes.DECIMAL(12, 2),
    },
  }, {
    tableName: 'TASKS',
    timestamps: false,
  });

  Task.associate = (models) => {
    Task.belongsTo(models.Repair, { foreignKey: 'ID_REPAIR' });
    Task.belongsTo(models.User,   { foreignKey: 'ID_USER', as: 'Mechanic' });
  };

  return Task;