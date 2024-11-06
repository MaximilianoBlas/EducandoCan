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
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};


sequelize.sync({ force: false }) 
    .then(async () => {
        const usersCount = await User.count(); 
        if (usersCount === 0) {
            await User.bulkCreate([
                { user: 'Colo', }
            ]);
            console.log('Datos iniciales insertados en la tabla User');
        }
    })
    .catch(error => console.error('Error al sincronizar la base de datos:', error));
