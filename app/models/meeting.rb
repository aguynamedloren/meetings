# frozen_string_literal: true

class Meeting < ActiveRecord::Base
  ACTIVE = "active"
  CANCELLED = "cancelled"

  STATUSES = [
    ACTIVE,
    CANCELLED,
  ]

  validates :ends_at, presence: true
  validates :location, presence: true
  validates :occurs_at, presence: true
  validates :status, presence: true, inclusion: { in: STATUSES }

  has_many :user_meetings, dependent: :destroy
  has_many :users, through: :user_meetings
end
