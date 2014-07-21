class ContactsController < ApplicationController
  layout 'admin'
  before_filter :authenticate_admin_user!

  def index
    @contacts = Contact.all
  end

  def show
    @contact = Contact.find(params[:id])
  end
end
