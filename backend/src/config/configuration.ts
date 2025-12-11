export default () => ({
  port: parseInt(process.env.APP_PORT as string, 10) || 3000,
  database: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST as string,
    port: parseInt(process.env.DB_PORT as string, 10) || 5432,
    username: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
  },
});
