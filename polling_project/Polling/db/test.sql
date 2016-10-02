SELECT
  polls.*, COUNT(questions.id)
FROM
  polls
JOIN questions
  ON questions.poll_id = polls.id
JOIN (
  SELECT
    responses.*
  FROM
)
GROUP BY
  polls.id
