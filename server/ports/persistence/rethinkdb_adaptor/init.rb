require 'rethinkdb'


RDB_CONFIG = {
  :host => ENV['RETHINK_HOST'] || 'localhost',
  :port => ENV['RETHINKDB_PORT'] || 28015,
  :authKey => ENV['RETHINKDB_AUTH'],
  :db   => ENV['RETHINKDB_DB']   || 'nulogy_books'
}


TABLES = ['users', 'books']


r = RethinkDB::RQL.new


configure do
  set :db, RDB_CONFIG[:db]

  connection = RethinkDB::Connection.new(:host => RDB_CONFIG[:host], :port => RDB_CONFIG[:port])

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
    r.connect(:host => RDB_CONFIG[:host], :port => RDB_CONFIG[:port], :authKey => RDB_CONFIG[:authKey], :db => settings.db)
  end
end


require_relative 'user_repository'
