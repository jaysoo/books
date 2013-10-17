require 'rethinkdb'


RDB_CONFIG = {
  :host => ENV['RETHINKDB_HOST'],
  :port => ENV['RETHINKDB_PORT'],
  :auth_key => ENV['RETHINKDB_AUTH'],
  :db   => 'nulogy_books'
}


TABLES = ['users', 'books']


p RDB_CONFIG

r = RethinkDB::RQL.new


configure do
  set :db, RDB_CONFIG[:db]

  connection = RethinkDB::Connection.new(:host => RDB_CONFIG[:host], :port => RDB_CONFIG[:port], :auth_key => RDB_CONFIG[:auth_key])

  begin
    r.db_create(RDB_CONFIG[:db]).run(connection)

    TABLES.each do |table|
      r.db(RDB_CONFIG[:db]).table_create(table).run(connection)
    end

  rescue RethinkDB::RqlRuntimeError
    puts "Database `books` and table `users` already exist."

  ensure
    connection.close
  end
end


module RethinkDbRepository
  def connection
    r = RethinkDB::RQL.new
    r.connect(:host => RDB_CONFIG[:host], :port => RDB_CONFIG[:port], :auth_key => RDB_CONFIG[:auth_key], :db => settings.db)
  end
end


require_relative 'user_repository'
