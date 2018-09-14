const server = require('./19.server');
const router = require('./19.router');

server.start(router.route);