class AddDescriptionToRants < ActiveRecord::Migration
  def change
    add_column :rants, :description, :text
  end
end
