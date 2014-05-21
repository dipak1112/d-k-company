ActiveAdmin.register Career do
  permit_params :title,:experience,:involvement,:location,:package,:skills

  index do
    column :title
    column :experience
    column :involvement
    column :location
    column :package
    column :skills
    actions defaults: true
  end

  filter :title
  filter :location
  filter :involvement
  filter :experience
  filter :skills
  filter :package

  form do |f|
    f.semantic_errors *f.object.errors.keys
    f.inputs "Career Details" do
      f.input :title
      f.input :location
      f.input :involvement
      f.input :experience
      f.input :skills
      f.input :package
    end
    f.actions
  end

  show :title => :title do |testimonial|
    attributes_table do
      row :title
      row :location
      row :involvement
      row :experience
      row :skills
      row :package
    end
  end
end
