const knex = require('knex')({
    client: 'mysql',
    connection:{
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'desa',
    }
})

module.exports = knex;