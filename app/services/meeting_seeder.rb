class MeetingSeeder
  def initialize(owner_id)
    @owner = User.find(owner_id)
  end

  def run
    seed_meeting
    add_owner_to_meeting
    seed_meeting_attendees
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
    @meeting = Meeting.create!(
      occurs_at: Faker::Time.between_dates(from: Time.now, to: Time.now + 14.days, period: :day),
      status: Meeting::STATUSES.sample,
      location: [Faker::Address.city, Faker::Address.state_abbr].join(", "),
    )
  end

  def seed_meeting_attendees
    (3..8).to_a.sample.times do
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
