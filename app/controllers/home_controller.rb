class HomeController < ApplicationController
  
  def index
  end

  def about_us
  end

  def contact_us
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

  private

  def contact_params
    params.require(:contact).permit(:name, :message, :email)
  end
end
