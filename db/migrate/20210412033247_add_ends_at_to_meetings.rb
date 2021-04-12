class AddEndsAtToMeetings < ActiveRecord::Migration[6.1]
  def up
    add_column :meetings, :ends_at, :datetime

    Meeting.all.each do |meeting|
      duration = [15, 30, 45, 60].sample.minutes

      meeting.update(
        ends_at: meeting.occurs_at + duration
      )
    end
  end

  def down
    remove_column :meetings, :ends_at
  end
end
