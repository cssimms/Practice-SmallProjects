class ShortenedUrls < ActiveRecord::Migration
  def change
    create_table :shortened_urls do |t|
      t.timestamps
      t.string :short_url, null: false
      t.string :long_url, null: false
      t.integer :submitter_id, null: false
    end
  end
end
