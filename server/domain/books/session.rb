class Session
  include Mongoid::Document
  include Mongoid::Timestamps::Created

  field :title, type: String
  field :notes, type: String

  index({ created_at: 1 }, { unique: true })
end
