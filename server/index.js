const express = require('express');
const path = require('path');
const server = express();
const PORT = 3000;

server.use(express.static(path.resolve(__dirname, '../client/dist')));

server.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../client/dist')));

server.listen(PORT, () => {
    console.log(`Serving static files on port 3000...`);
});