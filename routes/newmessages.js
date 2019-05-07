//this file contains the different routes and http request handlers, the first three lines are requiring express,expressRouter, and knex. Which allows me to use the features of each of them, for example, requiring knex gives me the ability to utliize knex commands in each route.
const express = require('express')
const router = express.Router()
const knex = require('../knex')

// When the user goes to the main URL (localhost:3001/newmessages), they will be able to see all users and messages in the table (newmessages)
router.get('/', (req, res, next) => {
  //line 9 accesses the table 'newmessages' which was created in the migration file
  knex('newmessages')
  //it will pull the id,name, and message from the table and return it in json format in the res (response)
  .select('id', 'name', 'message')
  .then((rows) => {
    res.json(rows)
  })
  .catch((err) => {
      next(err)
    })
})

//this will drill further into the 'newmessages' table, displaying one message based on the endpoints following the main URL (REST API architecture) the endpoint for this route would be (localhost:3001/newmessages/idforspecificuser)
router.get('/:id', (req, res, next) => {
  //accesses the 'newmessages' table
  knex('newmessages')
  .select('id', 'name', 'message')
  //line 26 pulls info based the endpoint given, the respective id used in the endpoint will give the user the specific user and message with that id, then returns all info from that id
  .where('id', req.params.id)
  .then((rows) => {
    res.json(rows[0])
  })
  .catch((err) => {
      next(err)
    })
})

// like the get route, this post route will again access the main 'newmessages' table and database, as seen by the endpoint provided.
router.post('/', (req, res, next) => {
  //starting at line 37 knex is called to drill into newmessages and (.insert) a new element into the database, which must follow constraints set in the migration file, the name will be the value of different key/value pairs in the json object, such as req.body.NAME for the users name.
  knex('newmessages')
  .insert({
    name: req.body.name,
    message: req.body.message
  })
  //once the data is inserted line 44 then returns the name and message that was created, and (.then) sends a json object in the response, more specifically the first element (data[0])
  .returning(['name','message'])
  .then((data) => {
    res.json(data[0])
  })
  .catch((err) => {
      next(err)
    })

})

//like the second GET route, this route focuses specifically on one message, which will be accessed via the proper endpoint (id)
router.patch('/:id', (req, res, next) => {
  //starting at line 57, knex accesses the 'newmessages' table, and then (.updates) the specific aspect of the data, in this case, the message, displayed by req.body.message
  knex('newmessages')
  .update({
    message: req.body.message
  })
  //knex checks the id of the user against the id thats being requested to be updated, and selects that users message to be edited, once that is done, it will return the id,name, and message related to what was updated, and include this in the res (response)
  .where('id', req.params.id)
  .returning(['id','name','message'])
  .then((data) => {
    res.json(data[0])
  })
  .catch((err) => {
    next(err)
  })
})
// This route is what handles drilling into one specific message and deleting it. Must be provided an endpoint, which in this case is the id of the user being deleted.
router.delete('/:id', (req, res, next) => {
  //knex accesses 'newmessages' and runs a (.del) method
  knex('newmessages')
  .del()
  //knex will only use the (.del) method on the user whos id matches the id in the endpoint, then use the .returning method to add the name,id,and message that was deleted, and adds it into the res (response)
  .where('id', req.params.id)
  .returning(['name', 'id', 'message'])
  .then((data) => {
    res.json(data[0])
  })
  .catch((err) => {
    next(err)
  })
})

module.exports = router
