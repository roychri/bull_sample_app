const Queue = require('bull');

const queue = new Queue( 'test', 'redis://redis:6379' );

module.exports = queue;
