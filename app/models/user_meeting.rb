# frozen_string_literal: true

class UserMeeting < ActiveRecord::Base
  ATTENDEE = "attendee"
  OWNER = "owner"
  YES = "yes"
  NO = "no"
  MAYBE = "maybe"

  ROLES = [
    ATTENDEE,
    OWNER,
  ]

  STATUSES = [
    YES,
    NO,
    MAYBE,
  ]

  validates :user_id, presence: true
  validates :meeting_id, presence: true
  validates :role, presence: true, inclusion: { in: ROLES }
  validates :status, presence: true, inclusion: { in: STATUSES }

  belongs_to :user
  belongs_to :meeting

  def self.priority_order
    order(Arel.sql("
        CASE
          WHEN role = 'owner' THEN '0'
          WHEN status = 'yes' THEN '1'
          WHEN status = 'maybe' THEN '2'
          WHEN status = 'no' THEN '3'
        END"))
  end
end
