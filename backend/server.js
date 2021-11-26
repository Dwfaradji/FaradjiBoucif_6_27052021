
//
const http = require('http');
// Va chercher le fichier app
const appli = require('./app');
// fait tourner l'appli sur le port 3000
appli.set('port', process.env.PORT || 3000);
//creer un serveur pour appli
const server = http.createServer(appli);
//port a écouter 
server.listen(process.env.PORT || 3000);