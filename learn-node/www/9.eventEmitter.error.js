const events = require('events');
const eventEmitter = new events.EventEmitter();
eventEmitter.emit('error');