require 'securerandom'
class ShortenedUrl < ActiveRecord::Base

  validates :submitter_id, :short_url, presence: true
  validates :short_url, uniqueness: true

  def self.random_code
    code = SecureRandom.urlsafe_base64(16)

    until !ShortenedUrl.exists?(code)
      code = SecureRandom.urlsafe_base64(16)
    end

    code
  end

  def self.create_for_user_and_long_url!(user, long_url)
    ShortenedUrl.create!(
    submitter_id: user.id,
    long_url: long_url,
    short_url: ShortenedUrl.random_code)
  end

  belongs_to :submitter,
    foreign_key: :submitter_id,
    primary_key: :id,
    class_name: :User

  has_many :visits,
    foreign_key: :short_url_id,
    primary_key: :id,
    class_name: :Visit

  has_many :visitors,
    through: :visits,
    source: :visitor

  def num_clicks
    visits.count
  end

  def num_uniques
    
  end



end
