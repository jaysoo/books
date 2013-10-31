require 'mongo'
require 'uri'


module MongoRepository
  def connection
    db = URI.parse(ENV['MONGOHQ_URL'])
    db_name = db.path.gsub(/^\//, '')
    db_connection = Mongo::Connection.new(db.host, db.port).db(db_name)
    db_connection.authenticate(db.user, db.password) unless (db.user.nil? || db.user.nil?)
    db_connection
  end
end


require_relative 'user_repository'
require_relative 'books_repository'
