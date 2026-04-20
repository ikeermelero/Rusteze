import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

  const Car = sequelize.define('Car', {
    id_car: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING(50),
    },
    model: {
      type: DataTypes.STRING(50),
    },
    plate: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    color: {
      type: DataTypes.STRING(30),
    },
    year: {
      type: DataTypes.INTEGER,
    },
  }, {
    tableName: 'cars',
    timestamps: false,
  });


export default Car;