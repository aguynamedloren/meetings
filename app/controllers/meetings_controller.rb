class MeetingsController < ApplicationController
  before_action :authenticate_user!

  def index
    meetings = current_user.meetings
    render json: meetings
  end

  def show
    meeting = current_user.meetings.find_by(id: params[:id])

    if meeting
      # todo: order by owner first,
      # then status yes
      # then status no
      users = meeting.user_meetings.includes(:user).map do |user_meeting|
        user = user_meeting.user

        {
          id: user.id,
          status: user_meeting.status,
          role: user_meeting.role,
          name: user.full_name,
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
