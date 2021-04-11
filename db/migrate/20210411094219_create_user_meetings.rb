class CreateUserMeetings < ActiveRecord::Migration[6.1]
  def change
    create_table :user_meetings do |t|
      t.integer :user_id, null: false
      t.integer :meeting_id, null: false
      t.string :status, null: false
      t.string :role, default: "attendee", null: false
      t.timestamps
    end

    add_index :user_meetings, :user_id
    add_index :user_meetings, :meeting_id
  end
end
