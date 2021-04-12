# frozen_string_literal: true

class Meeting < ActiveRecord::Base
  ACTIVE = "active"
  CANCELLED = "cancelled"

  STATUSES = [
    ACTIVE,
    CANCELLED,
  ]

  validates :ends_at, presence: true
  validates :street_address, presence: true
  validates :city, presence: true
  validates :state, presence: true
  validates :zip_code, presence: true
  validates :occurs_at, presence: true
  validates :status, presence: true, inclusion: { in: STATUSES }
  validate :valid_date_range

  has_many :user_meetings, dependent: :destroy
  has_many :users, through: :user_meetings

  def valid_date_range
    if (occurs_at && ends_at) && (ends_at < occurs_at)
      errors.add(:ends_at, "must be later than meeting start")
    end
  end
end
