class AddUuidToMeetings < ActiveRecord::Migration[6.1]
  def change
    enable_extension "uuid-ossp"

    add_column(
      :meetings,
      :uuid,
      :uuid,
      default: "uuid_generate_v4()",
      null: false,
    )

    add_index :meetings, :uuid, unique: true
  end
end
