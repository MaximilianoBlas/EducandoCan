const Sequelize = require('sequelize')
const fs = require('fs');
const path = require('path');
const Calendar = require('./models/bd/bdCalendar')
const BusiTime = require('./models/bd/busyTime')

const sequelize = new Sequelize({
          database: process.env.DB_NAME,
          dialect: 'postgres',
          host: process.env.DB_HOST,
          port: process.env.DB_PORT || 5432,
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          pool: {
            max: 3,
            min: 1,
            idle: 10000,
          },
          // dialectOptions: {
          //   ssl: {
          //     require: true,
          //     rejectUnauthorized: false,
          //   },
          //   keepAlive: true,
          // },
          // ssl: true,
})

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);


Calendar(sequelize);
BusiTime(sequelize)

module.exports = sequelize
