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
  	@projects = Project.all#where(:status => "active")
  end

  def portfolio
    @project = Project.find_by_slug(params[:id])
  end

  def blogs
  end

end
