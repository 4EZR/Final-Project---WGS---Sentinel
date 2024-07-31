require('dotenv').config();
const winston = require('winston');
const { Pool } = require('pg');

class PostgresTransport extends winston.Transport {
  constructor(opts) {
    super(opts);
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }

  log(info, callback) {
    setImmediate(() => {
      this.emit('logged', info);
    });

    const { level, message, metadata } = info;
    const text = 'INSERT INTO logs(level, message, metadata) VALUES($1, $2, $3)';
    const values = [level, message, JSON.stringify(metadata)];

    this.pool.query(text, values, (err, result) => {
      if (err) {
        console.error(err);
      }
      callback();
    });
  }
}

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new PostgresTransport({}),
  ],
});

module.exports = logger;
