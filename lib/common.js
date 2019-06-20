const querystring = require('querystring');

exports.ACTIONS = {
  ANNOUNCE: 0,
};

exports.MAX_ANNOUNCE_PEERS = 80;

exports.REMOVE_IPV4_MAPPED_IPV6_RE = /^::ffff:/;

exports.DB_KEY = 'peers_timestamp';

exports.querystringParse = q => querystring.parse(querystring.unescape(q), null, null);
