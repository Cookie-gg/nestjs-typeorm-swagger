/** @type {import('typeorm').ConnectionOptions} */

const config = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT, 10),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.NODE_ENV,
  synchronize: process.env.NODE_ENV !== 'production',
  entities: [process.cwd() + '/dist/domain/entities/**/*.js'],
  // migrations: [process.cwd() + '/dist/migrations/**/*.js'],
  cli: {
    entitiesDir: process.cwd() + '/src/domain/entities',
    // migrationsDir: process.cwd() + '/src/migrations',
  },
};

module.exports = config;
