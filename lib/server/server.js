const debug = require('debug')('gruut-tracker:server');
const EventEmitter = require('events');

const parseHttpRequest = require('./parse-http');

class Server extends EventEmitter {
  constructor(opts = {}) {
    super();
    debug('new server %s', JSON.stringify(opts));
  }

  static onHttpRequest(req, res) {
    try {
      const params = parseHttpRequest(req);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Server;
