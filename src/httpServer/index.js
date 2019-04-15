const httpLib = require('http');
const { router } = require('../router');

const httpServer = httpLib.createServer(router);
const httpServerPort = 8080;

exports.httpServer = httpServer;
exports.httpServerPort = httpServerPort;
