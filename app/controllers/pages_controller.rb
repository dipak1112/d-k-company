class PagesController < ApplicationController
  layout 'admin'
  before_filter :authenticate_admin_user!
  before_action :set_page, only: [:show, :edit, :update]

  def index
    @pages = Page.all
  end

  def show
  end

  def edit
  end

  def update
    if @page.update(page_params)
      redirect_to @page, notice: 'Page was successfully updated.'
    else
      render action: 'edit'
    end
  end

  private
    def set_page
      @page = Page.find(params[:id])
    end

    def page_params
      params.require(:page).permit(:page_content)
    end
end
