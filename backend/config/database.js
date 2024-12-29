module.exports = ({ env }) => ({
  connection: {
    client: 'pg', // This will use the 'pg' PostgreSQL client
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'), // PostgreSQL host
      port: env.int('DATABASE_PORT', 5432), // Default PostgreSQL port
      database: env('DATABASE_NAME', 'strapi_database'),
      user: env('DATABASE_USERNAME', 'strapi_user'),
      password: env('DATABASE_PASSWORD', 'your_password'),
      ssl: env.bool('DATABASE_SSL', true), // Enable SSL for Render's PostgreSQL
    },
    pool: {
      min: 2,
      max: 10
    },
  },
});
