const socketIo = require('socket.io');
const { httpServer } = require('../httpServer');

const ioServer = socketIo(httpServer);

exports.ioServer = ioServer;
