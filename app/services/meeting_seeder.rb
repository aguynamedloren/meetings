class MeetingSeeder
  DAYTIME_HOURS = (7..18).to_a
  MEETING_ATTENDEES = (3..8).to_a
  MEETING_INCREMENTS = [15, 30, 45, 60]

  def initialize(owner_id)
    @owner = User.find(owner_id)
  end

  def run
    seed_meeting
    add_owner_to_meeting
    seed_meeting_attendees

    return meeting
  end

  private

  attr_reader :owner, :meeting

  def add_owner_to_meeting
    owner.user_meetings.create!(
      meeting: meeting,
      status: UserMeeting::YES,
      role: UserMeeting::OWNER,
    )
  end

  def seed_meeting
    starts_at =
      Faker::Date.between(from: Date.today, to: Date.today + 14.days) +
      DAYTIME_HOURS.sample.hours +
      MEETING_INCREMENTS.sample.minutes

    ends_at = starts_at + MEETING_INCREMENTS.sample.minutes

    statuses = [
      Meeting::ACTIVE,
      Meeting::ACTIVE,
      Meeting::CANCELLED,
    ]

    @meeting = Meeting.create!(
      occurs_at: starts_at,
      ends_at: ends_at,
      status: statuses.sample,
      street_address: Faker::Address.street_address,
      secondary_address: Faker::Address.secondary_address,
      city: Faker::Address.city,
      state: Faker::Address.state_abbr,
      zip_code: Faker::Address.zip_code,
    )
  end

  def seed_meeting_attendees
    MEETING_ATTENDEES.sample.times do
      user = User.create!(
        email: Faker::Internet.unique.email,
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
        password: Faker::Config.random.seed,
      )

      user.user_meetings.create(
        meeting: meeting,
        status: UserMeeting::STATUSES.sample,
      )
    end
  end
end
