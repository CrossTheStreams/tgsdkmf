class ChangeLinkColumnToText < ActiveRecord::Migration
  def up
    remove_column :rants, :link
    add_column :rants, :link, :text
  end

  def down
  end
end
