# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20131003100709) do

  create_table "blood", :id => false, :force => true do |t|
    t.integer "morphno"
    t.string  "morphology", :limit => 10
    t.integer "density"
  end

  create_table "matrix1", :id => false, :force => true do |t|
    t.string "rowid",    :limit => 10
    t.string "columnid", :limit => 10
    t.float  "value"
  end

  create_table "matrix2", :id => false, :force => true do |t|
    t.string "rowid",    :limit => 10
    t.string "columnid", :limit => 10
    t.float  "value"
  end

  create_table "matrix3", :id => false, :force => true do |t|
    t.string "rowid",    :limit => 10
    t.string "columnid", :limit => 10
    t.float  "value"
  end

  create_table "order_items", :id => false, :force => true do |t|
    t.integer "id"
    t.integer "order_id"
    t.date    "order_date"
    t.integer "quantity"
  end

  create_table "orders", :id => false, :force => true do |t|
    t.integer "id"
    t.date    "order_date"
    t.integer "customer_id"
  end

  create_table "rants", :force => true do |t|
    t.text     "rant"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.text     "link"
  end

end
