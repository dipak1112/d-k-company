class CareersController < ApplicationController
  layout 'admin'
  before_action :set_career, only: [:show, :edit, :update, :destroy]

  # GET /careers
  # GET /careers.json
  def index
    @careers = Career.all
  end

  # GET /careers/1
  # GET /careers/1.json
  def show
  end

  # GET /careers/new
  def new
    @career = Career.new
  end

  # GET /careers/1/edit
  def edit
  end

  # POST /careers
  # POST /careers.json
  def create
    @career = Career.new(career_params)

    respond_to do |format|
      if @career.save
        format.html { redirect_to @career, notice: 'Career was successfully created.' }
        format.json { render action: 'show', status: :created, location: @career }
      else
        format.html { render action: 'new' }
        format.json { render json: @career.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /careers/1
  # PATCH/PUT /careers/1.json
  def update
    respond_to do |format|
      if @career.update(career_params)
        format.html { redirect_to @career, notice: 'Career was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @career.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /careers/1
  # DELETE /careers/1.json
  def destroy
    @career.destroy
    respond_to do |format|
      format.html { redirect_to careers_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_career
      @career = Career.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def career_params
      params.require(:career).permit(:title,:experience,:involvement,:location,:package,:skills)
    end
end
