class TestimonialsController < ApplicationController
  layout 'admin'
  before_filter :authenticate_admin_user!
  before_action :set_testimonial, only: [:show, :edit, :update, :destroy]

  def index
    @testimonials = Testimonial.all
  end

  def show
  end

  def new
    @testimonial = Testimonial.new
  end

  def edit
  end

  def create
    @testimonial = Testimonial.new(testimonial_params)
    if @testimonial.save
      redirect_to @testimonial, notice: 'Testimonial was successfully created.'
    else
      render action: 'new'
    end
  end

  def update
    if @testimonial.update(testimonial_params)
      redirect_to @testimonial, notice: 'Testimonial was successfully updated.'
    else
      render action: 'edit'
    end
  end

  def destroy
    @testimonial.destroy
    redirect_to testimonials_url
  end

  private
    def set_testimonial
      @testimonial = Testimonial.find(params[:id])
    end

    def testimonial_params
      params.require(:testimonial).permit(:client_name,:testimonial_content)
    end
end