# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


100.times do
  user = User.create!(user_name: Faker::Internet.user_name)

  if rand(50) > 25
    poll = Poll.create!(title: Faker::Hacker.noun,
                    author_id: user.id)
    (rand(3)+1).times do
      question = Question.create!(
      text: Faker::Lorem.sentence,
      poll_id: poll.id)

      4.times do
        AnswerChoice.create!(
        text: Faker::Hacker.say_something_smart,
        question_id: question.id)
      end
    end
  end
end

150.times do
  responder_id = (rand(99)+1)
  answer_choice = AnswerChoice.all.sample
  until answer_choice.question.poll.author_id != responder_id
    answer_choice = AnswerChoice.all.sample
    Response.create!(user_id: responder_id, answer_id: answer_choice.id)
  end
end
