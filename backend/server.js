const http = require('http');
const { startServer } = require('./app');
const { databaseConnection } = require('./db');

const PORT = process.env.PORT || 3001;

//Create HTTP server
const server = http.createServer();

//connect to the database
databaseConnection()
    .then(db => {
        startServer(server, db);
        server.listen(PORT, () => {
            console.log("Server is running");
        });
    })
    .catch(err => {
        console.error('Error starting server: ', err);
        process.exit(1);
    });
