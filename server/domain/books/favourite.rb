class Favourite
  include Mongoid::Document

  field :_id, type: String, default: ->{ "#{user_id}_#{book_id}" }
  field :user_id, type: String
  field :book_id, type: String

  index({ user_id: 1, book_id: 1 }, { unique: true })
end
