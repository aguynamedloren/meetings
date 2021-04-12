class MeetingsController < ApplicationController
  before_action :authenticate_user!

  def create
    meeting = MeetingSeeder.new(current_user.id).run

    render json: meeting
  end

  def index
    meetings = current_user.meetings.where(
      occurs_at: Date.today.beginning_of_day..Float::INFINITY
    ).order("occurs_at ASC")

    render json: meetings
  end

  def show
    meeting = current_user.meetings.find_by(uuid: params[:id])

    if meeting
      users = meeting.user_meetings.priority_order.includes(:user).map do |user_meeting|
        user = user_meeting.user

        {
          id: user.id,
          status: user_meeting.status,
          role: user_meeting.role,
          name: user.full_name,
          avatar_url: user.avatar_url,
        }
      end

      render json: {
        meeting: meeting,
        users: users
      }
    else
      render status: 404
    end
  end
end
