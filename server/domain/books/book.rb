class Book
  include Mongoid::Document
  include Mongoid::Timestamps::Created

  field :author, type: String
  field :title, type: String
  field :download_url, type: String

  index({ created_at: 1 }, { unique: true, name: "created_at_index" })
end
