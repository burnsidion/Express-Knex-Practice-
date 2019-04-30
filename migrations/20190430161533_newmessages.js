//this sets up a Promise with knex in order to create a database schema which will then be seeded, this creates the constraints for this peice of data.
exports.up = (knex, Promise) => {
  //line 4 creates a table called newmessages, with the constraints that follow
  return knex.schema.createTable('newmessages', (table) => {
    //line 6 creates each proceding message in incrementing order (kind of like i++ in a forloop)
    table.increments()
    //line 7 sets up a place for name of the user, cannot be left out, limited to 255 characters
    table.varchar('name', 255).notNullable()
    //line 10 creates a place for the message content, also must be included, limited to 255 characters
    table.varchar('message', 255).notNullable()
    //line 12 and 13 are creating the timestamp section of the table, displaying when the message was created and whatever time a user has updated the message.
    table.dateTime('created_at').notNullable().defaultTo(knex.raw('now()'))
    table.dateTime('updated_at').notNullable().defaultTo(knex.raw('now()'))
  })
};
//line 17 will run a check to see if there is already a table called 'newmessages' and if so it will erase it and recreate it based on these constraints.
exports.down = (knex, Promise) => knex.schema.dropTableIfExists('newmessages')
