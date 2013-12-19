ActiveAdmin.register Project do
  permit_params :project_title, :project_type, :is_new_project, :short_description, :long_description, :avatar

  index do
    column :project_title
    column :project_type
    column :is_new_project
    column :short_description
    default_actions
  end

  filter :project_type

  form do |f|
    f.inputs "Admin Details" do
      f.input :project_title
      f.input :short_description
      f.input :long_description
      f.input :project_type, :collection => ["ROR", "Android", "Iphone"]
      f.input :avatar
    end
    f.actions
  end

end
