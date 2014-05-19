ActiveAdmin.register Page do
  permit_params :name, :page_content

  index do
    column :name
    column :page_content
    actions defaults: true
  end

  form do |f|
    f.semantic_errors *f.object.errors.keys
    f.inputs "Page Details" do
      f.input :name
      f.input :page_content, :input_html => { :class => "tinymce"}
    end
    f.actions
  end

  show :title => :name do |page|
    attributes_table do
      row :name
      row :page_content
    end
  end
end
