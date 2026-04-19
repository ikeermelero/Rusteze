import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define(
  "User",
  {
    ID_USER: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ID_ROLE: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ID_TALLER: {
      type: DataTypes.INTEGER,
    },
    NAME: {
      type: DataTypes.STRING(100),
    },
    SURNAME: {
      type: DataTypes.STRING(100),
    },
    EMAIL: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    PASSWORD_HASH: {
      type: DataTypes.STRING(255),
    },
    PHONE: {
      type: DataTypes.STRING(20),
    },
    CREATED_AT: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "USERS",
    timestamps: false,
  },
);

User.associate = (models) => {
  User.belongsTo(models.Role, { foreignKey: "ID_ROLE" });
  User.belongsTo(models.Taller, { foreignKey: "ID_TALLER" });
  User.hasMany(models.Car, { foreignKey: "ID_USER" });
  User.hasMany(models.Reservation, { foreignKey: "ID_USER" });
  User.hasMany(models.Task, { foreignKey: "ID_USER", as: "AssignedTasks" });
};

return User;
