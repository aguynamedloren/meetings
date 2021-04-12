class AddFullAddressToMeetings < ActiveRecord::Migration[6.1]
  def change
    remove_column :meetings, :location

    add_column :meetings, :street_address, :string, null: false
    add_column :meetings, :secondary_address, :string
    add_column :meetings, :city, :string, null: false
    add_column :meetings, :state, :string, null: false
    add_column :meetings, :zip_code, :string, null: false
  end
end
