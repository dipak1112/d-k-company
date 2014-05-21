ActiveAdmin.register Page do
  permit_params :page_content

  actions  :index, :edit,:update,:show

  index do
    column :name
    column :page_content
    column "Actions" do |page|
      text_node link_to "View", admin_page_path(page)
      text_node "&nbsp".html_safe
      text_node link_to "Edit", edit_admin_page_path(page)
    end
  end

  filter :name
  filter :page_content

  form do |f|
    f.semantic_errors *f.object.errors.keys
    f.inputs "Page Details" do
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
