const { createClient } = require('redis');

const {
    REDIS_HOST,
    REDIS_PORT,
    REDIS_USERNAME,
    REDIS_PASSWORD
} = process.env ;

const client = createClient({
    host: REDIS_HOST,
    port: REDIS_PORT,
    username: REDIS_USERNAME,
    password: REDIS_PASSWORD
})

client
    .connect()
    .then(() => 
    console.log('redis server is up and running')
    )
    .catch(err => console.log(`${err.message}`))

module.exports = client;