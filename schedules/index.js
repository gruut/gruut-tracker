const {
  CronJob,
} = require('cron');
const moment = require('moment');

const common = require('../lib/common');

const schedules = {};

schedules.jobs = [];
const flushOldPeerData = new CronJob('* 30 * * * *', (() => {
  const oldTime = moment().subtract(30, 'minutes').unix();
  global.redisClient.zrevrangebyscore(common.DB_KEY, '-inf', oldTime);
}));
schedules.jobs.push(flushOldPeerData);

schedules.start = function () {
  this.jobs.forEach((job) => {
    job.start();
  });
};

module.exports = schedules;
