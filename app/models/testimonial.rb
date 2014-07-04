class Testimonial < ActiveRecord::Base
  validates_presence_of :client_name,:testimonial_content
end
