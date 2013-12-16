class Project < ActiveRecord::Base

	has_attached_file :avatar,
     :styles => { :thumb=> "370x289#{}"},
     :storage => :s3,
     :s3_credentials => "#{Rails.root}/config/amazon_s3.yml",
     :path => "/project/:id/:style/:filename"
  

	validates :project_title, :short_description, :project_type, :long_description, :presence => true
end
