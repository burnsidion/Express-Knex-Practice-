//process.env is basically an object containting environment variables that Node.js sends to the scripts of an application, and the NODE_ENV is a flag which express checks to determine the type of production setting. So in this case process.env.NODE_ENV || development means that this is a development environment, which is usually utilized for local testing of an application
const environment = process.env.NODE_ENV || 'development'

//this line connects the knexfile.js which defines the database connections, as well as the production environment
const knexConfig = require('./knexfile')[environment]


//this line calls knex into play, allowing me to utlize knex syntax and methods
const knex = require('knex')(knexConfig)
module.exports = knex
