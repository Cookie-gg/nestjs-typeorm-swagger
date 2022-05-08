module.exports = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT, 10),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.NODE_ENV,
  synchronize: process.env.NODE_ENV !== 'production',
  entities: ['./dist/entities/**/*.js'],
  migrations: ['./dist/migrations/**/*.js'],
  cli: {
    entitiesDir: './src/entities',
    migrationsDir: './src/migrations',
  },
};
