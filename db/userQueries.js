const connection = require('./knex')

module.exports = {
  getAllUsernames() {
    return connection.column('user_name').select().from('users')
  },
  createUser(user) {
    return connection('users').insert(user, '*')
  },
  findUserByUserName(userName) {
    return connection('users').where('user_name', userName).first()
  },
  update(user) {
    return connection('users').where('id', user.id).update(user, '*')
  }
}
