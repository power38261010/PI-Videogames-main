const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const {loadGeneros} = require("./src/Middleware/loadGenres");

conn.sync({ force: false }).then(() => {

    server.listen(process.env.PORT || 3001, () => {
        console.log('%s listening at 3001');
		loadGeneros();
  
    });
});