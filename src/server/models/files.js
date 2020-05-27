const Sequelize = require('sequelize')
const sequelize = require('../db/connection')

const Files = sequelize.define('files', {
    type: {
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING
    },
    data: {
        type: Sequelize.BLOB("long")
    }
})

Files.sync({
    force: false,
}).then(() => console.log('Files table synced'))
.catch(err => console.log(`Error in syncing model Files ${err}`))

module.exports = Files