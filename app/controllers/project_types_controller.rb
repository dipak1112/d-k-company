class ProjectTypesController < ApplicationController
  layout 'admin'
  before_filter :authenticate_admin_user!
  before_action :set_project_type, only: [:show, :edit, :update, :destroy]

  def index
    @project_types = ProjectType.all
  end

  def show
  end

  def new
    @project_type = ProjectType.new
  end

  def edit
  end

  def create
    @project_type = ProjectType.new(project_type_params)
    if @project_type.save
      redirect_to @project_type, notice: 'Project type was successfully created.'
    else
      render action: 'new'
    end
  end

  def update
    if @project_type.update(project_type_params)
      redirect_to @project_type, notice: 'Project type was successfully updated.'
    else
      render action: 'edit'
    end
  end

  def destroy
    if @project_type.active
      @project_type.update_attributes(active: false)
    else
      @project_type.update_attributes(active: true)
    end
    redirect_to :back
  end

  private
    def set_project_type
      @project_type = ProjectType.find(params[:id])
    end

    def project_type_params
      params.require(:project_type).permit(:name,:active)
    end
end
