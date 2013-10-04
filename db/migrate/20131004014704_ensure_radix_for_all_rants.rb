class EnsureRadixForAllRants < ActiveRecord::Migration
  def up
    Rant.all.map { |r| r.ensure_radix  }
  end

  def down
  end
end
