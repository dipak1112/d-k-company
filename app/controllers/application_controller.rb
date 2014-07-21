class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  layout :layout_by_resource
  protect_from_forgery with: :exception
  before_action :fetch_common_details

  def fetch_common_details
  	@address = Page.find_by(name: "Address")
  	@phone = Page.find_by(name: "Phone")
  	@email = Page.find_by(name: "Email")
  	@introduction = Page.find_by(name: "Introducing ApSolute Technology")
    @all_testimonials = Testimonial.all
  end

  def layout_by_resource
    if devise_controller?
      'admin'
    else
      'application'
    end
  end
end
