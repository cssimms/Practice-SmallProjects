# == Schema Information
#
# Table name: albums
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  band_id    :integer          not null
#  live       :boolean
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Album < ActiveRecord::Base
  validates :name, :band_id, presence: true
  validates :name, uniqueness: true

  belongs_to :band
  has_many :tracks, dependent: :destroy
end
