var redis = require("redis");
const configure = require('./configure')

const config = configure()
var db = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  retry_strategy: () => {
    return new Error("Retry time exhausted")
  }
})

process.on('SIGINT', function() {
  db.quit();
});

module.exports = db
