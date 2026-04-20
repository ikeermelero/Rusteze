import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

  const Invoice = sequelize.define(
    'Invoice', {
    id_invoice: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_repair: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    total: {
      type: DataTypes.DECIMAL(12, 2),
    },
    issued_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'invoices',
    timestamps: false,
  });

export default Invoice;