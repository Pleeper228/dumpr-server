
exports.up = function(knex, Promise) {
  return knex.schema.createTable('bathroom', table => {
    table.increments()
    table.text('establishment_name')
    table.text('address')
    table.text('photo_url')
    table.text('description')
    table.float('rating')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('bathroom')
};
