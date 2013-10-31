require 'rethinkdb'
include RethinkDB::Shortcuts


TABLE = 'books'


module BooksRepository
  include RethinkDbRepository
  extend self

  def all
    books = []
    r.table(TABLE).order_by(:id).run(connection).each{|book| books << book}
    books
  end

  def get id
    r.table(TABLE).get(id).run(connection)
  end

  def create book_data
    r.table(TABLE).insert(book_data).run(connection)
    book_data
  end
end
