# == Schema Information
#
# Table name: responses
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  answer_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Response < ActiveRecord::Base
  validates :user_id, :answer_id, presence: true
  validate :not_duplicate_response, :no_poll_rigging


  belongs_to :answer_choice,
    foreign_key: :answer_id,
    primary_key: :id,
    class_name: :AnswerChoice

  belongs_to :respondant,
    foreign_key: :user_id,
    primary_key: :id,
    class_name: :User

  has_one :question,
    through: :answer_choice,
    source: :question


  def sibling_responses
    question.responses.where.not(id: self.id)
  end

  def respondent_already_answered?
    sibling_responses.exists?(user_id: self.user_id)
  end

  def author_trying_to_answer?
    answer_choice.question.poll.author_id == self.user_id
  end



  private

  def not_duplicate_response
    if respondent_already_answered?
      errors[:base] << "no duplicate responses to the same question!"
    end
  end

  def no_poll_rigging
    if author_trying_to_answer?
      errors[:author_id] << "author cannot respond to own poll!!!"
    end
  end
end
