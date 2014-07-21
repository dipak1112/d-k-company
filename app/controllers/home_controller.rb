class HomeController < ApplicationController
  layout false, only: [:portfolio]

  #before_action :fetch_services, only: [:home, :services]
  
  def index
    @introduction                = Page.find_by(name: "Home Page Introduction")
    @staticts_countries_covered  = Page.find_by(name: "Staticts Countries Covered")
    @staticts_satisfied_clients  = Page.find_by(name: "Staticts Satisfied Clients")
    @staticts_finished_projects  = Page.find_by(name: "Staticts Finished Projects")
    @staticts_resources_strength = Page.find_by(name: "Staticts Resources Strength")
  end

  def about_us
    @introduction                = Page.find_by(name: "About Us Page Introduction")
    @staticts_countries_covered  = Page.find_by(name: "Staticts Countries Covered")
    @staticts_satisfied_clients  = Page.find_by(name: "Staticts Satisfied Clients")
    @staticts_finished_projects  = Page.find_by(name: "Staticts Finished Projects")
    @staticts_resources_strength = Page.find_by(name: "Staticts Resources Strength")
  end

  def contact_us
    #@page = Page.find_by(name: "Contact")
    if request.get?
      @contact = Contact.new
    else
      @contact = Contact.new(contact_params)
      if @contact.save
        #ContactMailer.contact_get_detail(@contact).deliver
        flash[:success] = "Message Sent. Thank You for Contacting Me"
        redirect_to root_path
      else
        render :action => "contact_us"
      end
    end
  end

  def careers
    @careers = Career.all
  end
  
  def services
  end

  def portfolio_list
  	@projects = Project.all.includes(:project_type)
    @project_types = ProjectType.all
  end

  def portfolio
    @project = Project.find(params[:id])
  end

  def blogs
  end

  private

  def contact_params
    params.require(:contact).permit(:name, :message, :email)
  end

  def fetch_services
    # @service_mobile_development = Page.find_by(name: "Service Mobile Development")
    # @service_website_development = Page.find_by(name: "Service Website Development")
    # @servive_seo_desining = Page.find_by(name: "Service SEO & Designing")
  end
end
