# frozen_string_literal: true

class User < ActiveRecord::Base
  extend Devise::Models
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  has_many :user_meetings, dependent: :destroy
  has_many :meetings, through: :user_meetings

  def full_name
    [first_name, last_name].join(" ")
  end

  def avatar_url
    Faker::Avatar.image(slug: avatar_slug, size: "100x100", format: "jpg")
  end

  private

  def avatar_slug
    [full_name, id].join("").parameterize
  end
end
