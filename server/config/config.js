
require('dotenv').config()
console.log(process.env)
module.exports = {
  port: process.env.PORT || 3000,
  host: process.env.HOST,
    url: 'https://us-autocomplete.api.smartystreets.com',
    auth_id: '7e7f5e6f-4f31-dd2b-9933-ebd15b59d799',
    auth_token: 'Ba7eWv3GrKwEJmK6JK42',
    db: {
        development: {
            username: "restraunt-app",
            password: "restraunt-app",
            database: "restraunt-app",
            host: "localhost",
            dialect: {
                dialect: "postgres"
            }
          },
          production: {
            url: process.env.DATABASE_URL,
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            dialect: "mysql"
        }

    }
}