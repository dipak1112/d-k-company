class HomeController < ApplicationController
  
  def index
  end

  def about_us
  end

  def contact_us
  end

  def services
  end

  def portfolio_list
  	@projects = Project.all
  end

  def portfolio
    @project = Project.find(params[:id])
  end

  def blogs
  end

end
