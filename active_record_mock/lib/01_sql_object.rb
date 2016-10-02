require_relative 'db_connection'
require 'active_support/inflector'
# NB: the attr_accessor we wrote in phase 0 is NOT used in the rest
# of this project. It was only a warm up.

class SQLObject

  def self.columns
    @table ||= DBConnection.execute2(<<-SQL)
      SELECT *
      FROM #{table_name}
    SQL
    @columns ||= @table.first.map {|col| col.to_sym}
  end

  def self.finalize!
    columns.each do |col|
      define_method("#{col}") do
        attributes[col]
      end
      define_method("#{col}=") do |value|
        attributes[col] = value
      end
    end
  end

  def self.table_name=(table_name)
    @table_name = table_name
  end

  def self.table_name
    @table_name ||= "#{self}".tableize
  end

  def self.all
    all_hashes = DBConnection.execute(<<-SQL)
      SELECT *
      FROM #{table_name}
    SQL
    parse_all(all_hashes)
  end

  def self.parse_all(results)
    objects = []
    results.each do |hash|
      objects << self.new(hash)
    end
    objects
  end

  def self.find(id)
      obj_hash = DBConnection.execute(<<-SQL)
        SELECT t.*
        FROM #{table_name} t
        WHERE t.id = #{id}
      SQL
      parse_all(obj_hash).first
  end

  def initialize(params = {})
      params.each do |attr_name, value|
        unless self.class.columns.include?(attr_name.to_sym)
          raise "unknown attribute '#{attr_name}'"
        end
        self.send("#{attr_name}=", value)
      end
  end

  def attributes
    @attributes ||= {}
  end

  def attribute_values
    attributes.values
  end

  def insert
    col_names = self.class.columns[1..-1].join(",")
    question_marks = []
    attribute_values.length.times {question_marks << ['?']}
    question_marks = question_marks.join(',')

    DBConnection.execute(<<-SQL, *attribute_values)
      INSERT INTO
        #{self.class.table_name} (#{col_names})
      VALUES
        (#{question_marks})
    SQL

    self.id = DBConnection.last_insert_row_id
  end

  def update
    set_string = self.class.columns.map do |col_name|
      "#{col_name} = ?"
    end
    set_string = set_string.join(',')
    DBConnection.execute(<<-SQL, *attribute_values)
      UPDATE
        #{self.class.table_name}
      SET
        #{set_string}
      WHERE
        id = #{self.id}
    SQL
  end

  def save
    id.nil? ? insert : update
  end
end
