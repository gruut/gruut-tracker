const querystring = require('querystring');

exports.ACTIONS = {
  ANNOUNCE: 0,
};

exports.MAX_ANNOUNCE_PEERS = 80;

exports.REMOVE_IPV4_MAPPED_IPV6_RE = /^::ffff:/;

exports.querystringParse = function (q) {
  return querystring.parse(q, null, null, {
    decodeURIComponent: unescape,
  });
};
