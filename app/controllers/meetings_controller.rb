class MeetingsController < ApplicationController
  before_action :authenticate_user!

  # todo: add auth
  def index
    meetings = current_user.meetings
    render json: meetings
  end
end
