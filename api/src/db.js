require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE, PGPORT } = process.env;

// Ruta donde has guardado los certificados
const caPath1 = path.resolve(__dirname, 'certificates', 'Microsoft-RSA-Root-Certificate- Authority-2017.crt');
const caPath2 = path.resolve(__dirname, 'certificates', 'DigiCertGlobalRootG2.crt.pem');
const caPath3 = path.resolve(__dirname, 'certificates', 'DigiCertGlobalRootCA.crt');

const sequelize = new Sequelize(`postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}`, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
      ca: [
        fs.readFileSync(caPath1, 'utf-8'),
        fs.readFileSync(caPath2, 'utf-8'),
        fs.readFileSync(caPath3, 'utf-8')
      ]
    }
  }
});

// const sequelize = new Sequelize(`postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}`, {
//   dialect: 'postgres'
// });

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

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Videogame, Genre } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Videogame.belongsToMany(Genre, { through: "Videogames_Genres" });
Genre.belongsToMany(Videogame, { through: "Videogames_Genres" });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importar la conexión { conn } = require('./db.js');
};
