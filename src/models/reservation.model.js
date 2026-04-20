import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

  const Reservation = sequelize.define(
    'Reservation', {
    id_reservation: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_car: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_taller: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER, // minutos
    },
    status: {
      type: DataTypes.STRING(50),
    },
    votes: {
      type: DataTypes.INTEGER,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'reservations',
    timestamps: false,
  });

export default Reservation;