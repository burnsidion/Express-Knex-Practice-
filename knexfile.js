module.exports = {
development: {
client: 'pg',
connection: 'postgres://localhost/newmessages-dev'
},
test: {
client: 'pg',
connection: 'postgres://localhost/newmessages-test'
},
production: {
client: 'pg',
connection: process.env.DATABASE_URL
}
}
