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

    const ip = req.connection.remoteAddress.replace(common.REMOVE_IPV4_MAPPED_IPV6_RE, '');
    const { port } = params;
    if (!port) throw new Error('port is empty');

    params.addr = `${ip}:${port}`;
    params.timestamp = moment().unix();
  } else {
    throw new Error(`invalid action in HTTP request: ${req.url}`);
  }

  return params;
}

module.exports = parseHttpRequest;
