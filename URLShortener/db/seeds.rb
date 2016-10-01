# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

user1 = User.create ('User1@email.com')
user2 = User.create ('User2@email.com')
user3 = User.create ('User3@email.com')
user4 = User.create ('User4@email.com')
user5 = User.create ('User5@email.com')
user6 = User.create ('User6@email.com')

ShortenedUrl.create_for_user_and_long_url(user1, '1streallylongurlthatdoesntmakeanysenseohshitshutupfool.')
ShortenedUrl.create_for_user_and_long_url(user2, '2streallylongurlthatdoesntmakeanysenseohshitshutupfool.')
ShortenedUrl.create_for_user_and_long_url(user3, '3streallylongurlthatdoesntmakeanysenseohshitshutupfool.')
ShortenedUrl.create_for_user_and_long_url(user4, '4streallylongurlthatdoesntmakeanysenseohshitshutupfool.')
ShortenedUrl.create_for_user_and_long_url(user1, '5streallylongurlthatdoesntmakeanysenseohshitshutupfool.')
ShortenedUrl.create_for_user_and_long_url(user1, '6streallylongurlthatdoesntmakeanysenseohshitshutupfool.')
ShortenedUrl.create_for_user_and_long_url(user6, '7streallylongurlthatdoesntmakeanysenseohshitshutupfool.')
