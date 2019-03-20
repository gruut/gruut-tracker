module.exports = {
  apps: [{
    name: 'gruut-tracker',
    script: 'app.js',
    instances: 1,
    env: {
      NODE_ENV: 'production',
    },
    output: '/dev/null',
  }],
};
