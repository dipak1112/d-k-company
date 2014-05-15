ActiveAdmin.register ProjectType do
  permit_params :name, :active

  index do
    column :name
    column :active
    actions defaults: true
    #actions :defaults => false do |type|
      #link_to "View", admin_project_type_path(type)
      #link_to "Edit", edit_admin_project_type_path(type)
      #link_to "#{type.active ? 'Deactivate' : 'Activate'}", admin_project_type_path(type), :method => :delete     
    #end
    
  end

  filter :name

  form do |f|
    f.semantic_errors *f.object.errors.keys
    f.inputs "Project Type Details" do
      f.input :name
    end
    f.actions
  end

  show :title => :name do |project|
    attributes_table do
      row :name
      row :active
    end
  end

  controller do
    def destroy
      project_type = ProjectType.find(params[:id])
    if project_type.active
      project_type.active = false
    else
      project_type.active = true
    end
    project_type.save
    flash[:notice] = "Project Type #{project_type.name} #{project_type.active ? 'activated' : 'deactivated'}"
    redirect_to  admin_project_types_path
    end
  end
end
