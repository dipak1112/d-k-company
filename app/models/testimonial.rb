class Testimonial < ActiveRecord::Base
  has_attached_file :client_picture, :default_url => "assets/avatar.jpg"
  validates_attachment_content_type :client_picture, :content_type => /\Aimage\/.*\Z/
end
