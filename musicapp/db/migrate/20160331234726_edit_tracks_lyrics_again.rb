class EditTracksLyricsAgain < ActiveRecord::Migration
  def change
    change_column :tracks, :lyrics, :text, null:true
  end
end
