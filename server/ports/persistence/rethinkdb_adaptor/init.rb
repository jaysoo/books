require 'rethinkdb'


RDB_CONFIG = {
  :host => ENV['RETHINKDB_HOST'],
  :port => ENV['RETHINKDB_PORT'],
  :auth_key => ENV['RETHINKDB_AUTH'],
  :db   => 'nulogy_books'
}

puts RDB_CONFIG


TABLES = ['users', 'books']


r = RethinkDB::RQL.new


configure do
  set :db, RDB_CONFIG[:db]

  connection = RethinkDB::Connection.new(:host => RDB_CONFIG[:host], :port => RDB_CONFIG[:port], :auth_key => RDB_CONFIG[:auth_key])

  begin
    begin
      r.db_create(RDB_CONFIG[:db]).run(connection)
    rescue RethinkDB::RqlRuntimeError
    end

    TABLES.each do |table|
      begin
        r.db(RDB_CONFIG[:db]).table_create(table).run(connection)
      rescue RethinkDB::RqlRuntimeError
        puts "Database `#{table}` already exists."
      end
    end

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
require_relative 'books_repository'
