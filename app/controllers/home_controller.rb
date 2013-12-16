class HomeController < ApplicationController
  def index
  	@projects = Project.all
  end

  def show
  	@project = Project.find(params[:slug])
  end
end
