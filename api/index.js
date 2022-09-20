const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const {loadGeneros} = require("./src/Middleware/loadGenres");
const PORT = process.env.PORT ||3001

conn.sync({ force: false }).then(() => {

    server.listen(PORT, () => {
        console.log(`%s listening at port ${ PORT }`);
		loadGeneros();
  
    });
});