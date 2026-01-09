
const { createClient} = require("redis");

const client = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'redis-19072.c267.us-east-1-4.ec2.cloud.redislabs.com',
        port: 19072
    }
});

client.on('error', err => console.log('Redis Client Error', err));

module.exports = client;