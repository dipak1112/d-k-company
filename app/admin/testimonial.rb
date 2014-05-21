ActiveAdmin.register Testimonial do
  permit_params :client_name,:testimonial_content,:client_picture

  index do
    column :client_name
    column :testimonial_content
    actions defaults: true
  end

  filter :client_name
  filter :testimonial_content

  form do |f|
    f.semantic_errors *f.object.errors.keys
    f.inputs "Testimonial Details" do
      f.input :client_name
      f.input :testimonial_content
      f.input :client_picture
    end
    f.actions
  end

  show :title => :client_name do |testimonial|
    attributes_table do
      row :client_name
      row :testimonial_content
      row :client_picture do
        image_tag(testimonial.client_picture.url, :size => "100x100")
      end
    end
  end
end
