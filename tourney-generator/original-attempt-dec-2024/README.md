# Interview Challenge

Welcome to the interview!

This is an interview where you must build on another person's code. Your job is to
extend what it can do and improve the codebase. Our aim here is to simulate what it
will be like to work at a company like ours, and see how you do.

The code in this project is designed to have flaws. Some things are hacked together.
Some things are done unconventionally. Some things aren't future-flexible. Oops!

## Backstory

You've been hired by the San Francisco Office Sports League (SFOSL) to improve
a tool that we use to run tournaments. We have a bunch of companies that you've
probably heard of paying us to run office tournaments. Everything from Foosball
to Ping Pong.

This tool was built by our old CTO. Unfortunately, he got frustrated with the
codebase of his own design and left for another greenfield project.

We've got some big name clients banging on the proverbial doors so we need your
help! Not only do we need to support a new tournament type, but we'd like you to
clean up some of CTO's mess.

## Current Product

This tool is built in node.js and it runs single elimination tournament brackets.
For the sake of clarity, everything _except_ this has been removed. There's no
user signup or styling or front-end stuff.

An on-site referee who runs the tournament will run this tool on their laptop,
connected to a projector. During the tournament they'll enter scores from players
and the system will manage the bracket.

## Goals

There are three goals that you must fulfill.

_Goal 1_: *Add a new tournament type*

Currently we only support single elimination tournaments. We'd like you to add
support for a tournament where everyone plays 10 rounds of Round Robin, the top
16 players are then selected for a single-elimination playoff. These work great
for tournaments with 1000 participants.

We plan on adding new tournament types in the future, like Double Elimination.
You don't need to add that, but write a plan for future developers to do that.

_Goal 2_: *Improve the maintainability of the codebase*

Find a way to improve the codebase for future developers. This is intentionally
open-ended.

_Goal 3_: *Improve the product for referees*

Let's be real, this product sucks. While we've trained our current crew of refs
to use this product, we're going to want to increase our fleet. Make the product
better for future referees in some way.

## Rules

You have the day to work on this. We're not looking for perfection, but a
demonstration of your skills and thought process. As a fake startup, pragmatism
is key and you can't make Monopoly money unless you build something that our
imaginary friends want.

Feel free to use Google, StackOverflow, etc as you work. That's how it works in
the real world and we're not really whole developers without our electronic
brains. However, beyond passively researching online, don't seek out the help
of others on this problem.

After you're finished with this, you can email greg@wefunder.com a ZIP of your
code or upload it to GitHub and share with gbelote.



# Getting Started

For convenience, we've set this project up with Docker and seed data.

First, start up a local server:
```bash
docker-compose up --force-recreate --build
```

Then create, migrate, and seed the database with:

```bash
docker-compose exec web sequelize-cli db:create
docker-compose exec web sequelize-cli db:migrate
docker-compose exec web sequelize-cli db:seed:all
```

Make sure it's working by running tests
```bash
docker-compose exec -e NODE_ENV=test web sequelize-cli db:create
docker-compose exec -e NODE_ENV=test web sequelize-cli db:migrate

docker-compose exec web npm test
```

If everything looks good, go to http://localhost:8080/tournaments

![Demo](/docs/demo.gif)

You can use Sequelize CLI or any other command via `docker-compose exec web` like
```bash
docker-compose exec web sequelize-cli [...]
```
