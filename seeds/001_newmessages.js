//this is a seed file, which will be used to populate the database schema with the information provided below, each piece of data must follow the constraints set up in the migrations file (....-newmessages.js)
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('newmessages').del().then(function() {
    // Line 6 returns a cleared out table and inserts seed entries into it.
    return knex('newmessages').insert([
      {
        id: 1,
        name: 'Criminal',
        message: 'What are you?',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 2,
        name: 'Batman',
        message: 'I\'m Batman',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }
    ])
    //this line is the final part of the promise, it returns the table with the inserted seeds and displays all the id's for each entry
    .then(() => {
        return knex.raw(`SELECT setval('newmessages_id_seq', (SELECT MAX(id) FROM newmessages));`)
      })
  });
};
