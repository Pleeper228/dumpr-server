const connection = require('./knex')

module.exports = {
  getAll() {
    return connection('bathroom')
  },
  getOne(id) {
    return connection('bathroom').where('id', id).first()
  },
  create(bathroom) {
    return connection('bathroom').insert(bathroom, '*')
  },
  update(id, bathroom) {
    return connection('bathroom').where('id', id).update(bathroom, '*')
  },
  delete(id) {
    return connection('bathroom').where('id', id).del()
  }
}
