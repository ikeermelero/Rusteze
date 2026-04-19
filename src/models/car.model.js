const { DataTypes } = require('sequelize');


  const Car = sequelize.define('Car', {
    ID_CAR: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ID_USER: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    BRAND: {
      type: DataTypes.STRING(50),
    },
    MODEL: {
      type: DataTypes.STRING(50),
    },
    PLATE: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    COLOR: {
      type: DataTypes.STRING(30),
    },
    YEAR: {
      type: DataTypes.INTEGER,
    },
  }, {
    tableName: 'CARS',
    timestamps: false,
  });

  Car.associate = (models) => {
    Car.belongsTo(models.User, { foreignKey: 'ID_USER' });
    Car.hasMany(models.Reservation, { foreignKey: 'ID_CAR' });
    Car.hasMany(models.Repair,      { foreignKey: 'ID_CAR' });
  };

  return Car;