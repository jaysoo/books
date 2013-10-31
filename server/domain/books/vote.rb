class Vote
  include Mongoid::Document

  field :session_id, type: String
  field :book_id, type: String
  field :user_id, type: String
  field :count, type: Integer

  index({ session_id: 1, user_id: 1, book_id: 1 }, { unique: true })
end
