require_relative 'db_connection'
require_relative '01_sql_object'

module Searchable
  def where(params)
    query_args = params.values
    where_line = params.keys.map do |col_name|
      "#{col_name} = ?"
    end.join(' AND ')

    query_hash = DBConnection.execute(<<-SQL, *query_args)
      SELECT
        *
      FROM
        #{table_name}
      WHERE
        #{where_line}
    SQL
    parse_all(query_hash)
  end
end

class SQLObject
  extend Searchable
end
