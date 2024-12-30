// ormconfig.js
module.exports = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/*.js'],
    cli: {
      migrationsDir: 'src/migrations',
    },
    ssl: {
      rejectUnauthorized: false,
    },
  };
  