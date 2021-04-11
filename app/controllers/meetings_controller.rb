class MeetingsController < ApplicationController
  # todo: add auth
  def index
    meetings = Meeting.all
    render json: meetings
  end
end
