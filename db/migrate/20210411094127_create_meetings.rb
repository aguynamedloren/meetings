class CreateMeetings < ActiveRecord::Migration[6.1]
  def change
    create_table :meetings do |t|
      t.datetime :occurs_at, null: false
      t.string :location, null: false
      t.string :status, default: "active", null: false
      t.timestamps
    end
  end
end
