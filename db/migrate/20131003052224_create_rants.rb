class CreateRants < ActiveRecord::Migration
  def change
    create_table :rants do |t|
      t.text :rant
      t.string :link
      t.timestamps
    end
  end
end
