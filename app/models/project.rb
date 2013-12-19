class Project < ActiveRecord::Base

	#extend FriendlyId
  #friendly_id :slug, use: :history
	
	  #has_attached_file :avatar, 
    #:styles => { :pfolio_e => "650x600!",:pfolio => "310x230!" },
    #:url => "/project/:id/:style/:basename.:extension",
    #:path => ":rails_root/public/project/:id/:style/:basename.:extension"


	has_attached_file :avatar,
     :styles => { :thumb=> "370x289#{}"},
     :storage => :s3,
     :s3_credentials => "#{Rails.root}/config/amazon_s3.yml",
     :path => "/project/:id/:style/:filename"
  
	validates :project_title, :short_description, :project_type, :long_description, :presence => true

end
