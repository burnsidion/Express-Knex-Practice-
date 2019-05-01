//this file contains the different objects for varying production environments, each object contains the database that will be utlized for it, for example, the development environment will use the newmessages-dev database. The client for each of these is all Postgresql (pg).
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
//this line will utlize the URL that is created with Heroku eventually for the production environment. 
connection: process.env.DATABASE_URL
}
}
