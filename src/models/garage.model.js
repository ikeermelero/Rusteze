import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Taller = sequelize.define(
  "Taller",
  {
    ID_TALLER: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ADDRESS: {
      type: DataTypes.STRING(255),
    },
    CITY: {
      type: DataTypes.STRING(100),
    },
    PHONE: {
      type: DataTypes.STRING(20),
    },
    GMAIL: {
      type: DataTypes.STRING(100),
    },
  },
  {
    tableName: "TALLERES",
    timestamps: false,
  },
);

Taller.associate = (models) => {
  Taller.hasMany(models.User, { foreignKey: "ID_TALLER" });
  Taller.hasMany(models.Reservation, { foreignKey: "ID_TALLER" });
};

return Taller;
