class Visit < ActiveRecord::Base
  validates :short_url_id, :visitor_id, presence: true

  def self.record_visit!(user, short_url_id)
    Visit.create(visitor_id: user, short_url_id: short_url_id)
  end

  belongs_to :visitor,
    foreign_key: :visitor_id,
    primary_key: :id,
    class_name: :User

  belongs_to :url,
    foreign_key: :short_url_id,
    primary_key: :id,
    class_name: :ShortenedUrl
end
