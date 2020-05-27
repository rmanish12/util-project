const Sequelize = require('sequelize')

const DATABASE = process.env.DATABASE
const DBUSER = process.env.DBUSER
const DBPASSWORD = process.env.DBPASSWORD
const DBHOST = process.env.DBHOST
const DBDIALECT = process.env.DBDIALECT

const sequelize = new Sequelize(DATABASE, DBUSER, DBPASSWORD, {
    host: DBHOST,
    dialect: DBDIALECT
}, {
    logging: false // will turn off logging db queries
})

sequelize.authenticate()
        .then(() => console.log('Database connected'))
        .catch(err => console.log(`Database connection failed with err: ${err}`)) 

module.exports = sequelize