import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Role = sequelize.define(
  "Role",
  {
    ID_ROLE: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    NAME: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    PRIORITY: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "ROLES",
    timestamps: false,
  },
);

Role.associate = (models) => {
  Role.hasMany(models.User, { foreignKey: "ID_ROLE" });
};

return Role;
