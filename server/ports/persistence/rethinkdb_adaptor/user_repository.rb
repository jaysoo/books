require 'rethinkdb'
include RethinkDB::Shortcuts


TABLE = 'users'


module UserRepository
  include RethinkDbRepository
  extend self

  def find id
    from_storage = r.table(TABLE).get(id).run(connection)

    if from_storage
      user = User.new
      user.id = from_storage[:id]
      user.name = from_storage[:name]
      user.email = from_storage[:email]
      user
    else
      nil
    end
  end

  def create user
    to_storage = {
      id: user.id,
      name: user.name,
      email: user.email
    }
    r.table(TABLE).insert(to_storage).run(connection)
  end
end
