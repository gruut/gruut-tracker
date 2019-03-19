const express = require('express');
const TrackerServer = require('../lib/server/server');

const router = express.Router();

router.get('/announce', TrackerServer.onHttpRequest);

module.exports = router;
