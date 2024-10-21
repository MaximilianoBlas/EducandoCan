const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(
  'railway', // Nombre de la base de datos
  'postgres', // Usuario de la base de datos
  'alvwOLooJwOQwlDrFaOBqtTvHEGovvpK', // Contraseña de la base de datos
  {
    host: 'postgres-ppsc.railway.internal', // Host (servidor de la base de datos)
    port: 5432, // Puerto de la base de datos (5432 es el predeterminado para PostgreSQL)
    dialect: 'postgres', // Tipo de base de datos
  }
);
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

  
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Calendar",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      paymentId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      payment: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
      },
    },
    {
      timestamps: false,
    }
  );
};

sequelize.sync();
