ActiveAdmin.register Page do
  permit_params :name, :page_content

  index do
    column :name
    column :page_content
    actions defaults: true
  end

  show :title => :name do |page|
    attributes_table do
      row :name
      row :page_content
    end
  end  
end
