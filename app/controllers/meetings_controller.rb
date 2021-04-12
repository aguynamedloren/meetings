class MeetingsController < ApplicationController
  before_action :authenticate_user!

  def index
    meetings = current_user.meetings
    render json: meetings
  end

  def show
    meeting = current_user.meetings.find_by(id: params[:id])

    if meeting
      render json: meeting
    else
      render status: 404
    end
  end
end
