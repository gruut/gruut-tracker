const moment = require('moment');
const common = require('../common');

function parseHttpRequest(req) {
  const s = req.url.split('?');
  const params = common.querystringParse(s[1]);
  const path = s[0];

  if (path === '/announce') {
    params.action = common.ACTIONS.ANNOUNCE;

    params.numwant = Math.min(
      Number(params.numwant) || common.DEFAULT_ANNOUNCE_PEERS,
      common.MAX_ANNOUNCE_PEERS,
    );

    params.ip = req.connection.remoteAddress.replace(common.REMOVE_IPV4_MAPPED_IPV6_RE, '');
    params.port = req.connection.remotePort;
    if (!params.port) throw new Error('invalid port');

    params.addr = `${params.ip}:${params.port}`;
    params.headers = req.headers;
    params.timestamp = moment().unix();
  } else {
    throw new Error(`invalid action in HTTP request: ${req.url}`);
  }

  return params;
}

module.exports = parseHttpRequest;
