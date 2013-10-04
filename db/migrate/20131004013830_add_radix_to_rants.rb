class AddRadixToRants < ActiveRecord::Migration
  def change
    add_column :rants, :radix, :string
  end
end
