const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const port = 3002

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
    server.listen(port, () => {
        console.log(`%s listening at ${port}`); // eslint-disable-line no-console
    });
});