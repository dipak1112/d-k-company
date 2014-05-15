ActiveAdmin.register Project do
  permit_params :project_title, :project_type_id, :is_new_project, :short_description, :long_description, :avatar

  index do
    column :project_title
    column :project_type
    column :short_description
    actions defaults: true
  end

  filter :project_type

  form do |f|
    f.semantic_errors *f.object.errors.keys
    f.inputs "Project Details" do
      f.input :project_title
      f.input :short_description
      f.input :long_description
      f.input :project_type_id, as: :select, :collection => ProjectType.where(active: true)
      f.input :avatar
    end
    f.actions
  end

  show :title => :project_title do |project|
    attributes_table do
      row :project_title
      row :project_type
      row :short_description
      row :long_description
      row :avatar do
        image_tag(project.avatar.url, :size => "500x400")
      end
    end
  end
end
