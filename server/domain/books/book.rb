class Book
  include Mongoid::Document

  field :author, type: String
  field :title, type: String
  field :download_url, type: String
end
