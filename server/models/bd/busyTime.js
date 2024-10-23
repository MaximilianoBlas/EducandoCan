const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(
  'railway', 
  'postgres', 
  'alvwOLooJwOQwlDrFaOBqtTvHEGovvpK',
  {
    host: 'postgres-ppsc.railway.internal', 
    port: 5432, 
    dialect: 'postgres', 
  }
);
  
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "busyTime",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      busyTime: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};

sequelize.sync();
