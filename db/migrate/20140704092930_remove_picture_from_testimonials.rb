class RemovePictureFromTestimonials < ActiveRecord::Migration
  def change
  	drop_attached_file :testimonials, :client_picture
  end
end
