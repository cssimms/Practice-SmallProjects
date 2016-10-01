class User < ActiveRecord::Base
  validates :email, presence: true, uniqueness: true

  has_many :shortened_urls,
    foreign_key: :submitter_id,
    primary_key: :id,
    class_name: :ShortenedUrl

  has_many :visits,
    foreign_key: :visitor_id,
    primary_key: :id,
    class_name: :Visit

  has_many :visited_urls,
    through: :visits,
    source: :url


end
