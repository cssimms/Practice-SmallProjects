# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


Bench.create(
  description: "this is a bear. not a bench",
  lat: 37.772036,
  lng: -122.445806)

Bench.create(
  description: "somewhere in sf",
  lat: 37.768700,
  lng: -122.470995)

Bench.create(
  description: "another bench",
  lat: 37.725190,
  lng: -122.413266)

Bench.create(
  description: "I'm lost over here",
  lat: 37.779492,
  lng: -122.389240)

Bench.create(
  description: "what do I do",
  lat: 37.808273,
  lng: -122.470375)
