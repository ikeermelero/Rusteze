import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Repair = sequelize.define(
  "Repair",
  {
    ID_REPAIR: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ID_CAR: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    STATUS: {
      type: DataTypes.STRING(50),
    },
    DIAGNOSIS: {
      type: DataTypes.TEXT,
    },
    TOTAL_COST: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0.0,
    },
    START_DATE: {
      type: DataTypes.DATEONLY,
    },
    END_DATE: {
      type: DataTypes.DATEONLY,
    },
    CREATED_AT: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "REPAIRS",
    timestamps: false,
  },
);

Repair.associate = (models) => {
  Repair.belongsTo(models.Car, { foreignKey: "ID_CAR" });
  Repair.hasMany(models.Task, { foreignKey: "ID_REPAIR" });
  Repair.hasOne(models.Invoice, { foreignKey: "ID_REPAIR" });
};

return Repair;
