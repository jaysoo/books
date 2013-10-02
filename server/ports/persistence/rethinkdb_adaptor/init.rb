require 'rethinkdb'


RDB_CONFIG = {
  :host => ENV['RDB_HOST'] || 'localhost',
  :port => ENV['RDB_PORT'] || 28015,
  :db   => ENV['RDB_DB']   || 'books'
}


TABLES = ['users']


r = RethinkDB::RQL.new


configure do
  set :db, RDB_CONFIG[:db]

  connection = RethinkDB::Connection.new(:host => RDB_CONFIG[:host], :port => RDB_CONFIG[:port])

  begin
    r.db_create(RDB_CONFIG[:db]).run(connection)

    TABLES.each do |tables|
      r.db(RDB_CONFIG[:db]).table_create(table).run(connection)
    end

  rescue RethinkDB::RqlRuntimeError => e
    puts "Database `books` and table `users` already exist."

  ensure
    connection.close
  end
end


module RethinkDbRepository
  def connection
    r = RethinkDB::RQL.new
    r.connect(:host => RDB_CONFIG[:host], :port => RDB_CONFIG[:port], :db => settings.db)
  end
end


require_relative 'user_repository'
