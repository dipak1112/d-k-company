ActiveAdmin.register ProjectType do
  permit_params :name, :active

  index do
    column :name
    column :active
    column "Actions" do |type|
      text_node link_to "View", admin_project_type_path(type)
      text_node "&nbsp".html_safe
      text_node link_to "Edit", edit_admin_project_type_path(type)
      text_node "&nbsp".html_safe
      text_node link_to "#{type.active ? 'Deactivate' : 'Activate'}", admin_project_type_path(type), :method => :delete
    end    
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
