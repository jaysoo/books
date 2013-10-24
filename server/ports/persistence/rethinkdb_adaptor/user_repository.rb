require 'rethinkdb'
include RethinkDB::Shortcuts


TABLE = 'users'


module UserRepository
  include RethinkDbRepository
  extend self

  def get id
    r.table(TABLE).get(id).run(connection)
  end

  def create user_data
    r.table(TABLE).insert(user_data).run(connection)
    user_data
  end
end
