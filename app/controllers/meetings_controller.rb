class MeetingsController < ApplicationController
  before_action :authenticate_user!

  def index
    meetings = current_user.meetings
    render json: meetings
  end

  def show
    meeting = current_user.meetings.find_by(id: params[:id])

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
