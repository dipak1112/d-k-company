class Project < ActiveRecord::Base

	#extend FriendlyId
  #friendly_id :slug, use: :history
	
	has_attached_file :avatar, 
    :styles => { :pfolio_e => "650x600!",:pfolio => "370x289!" },
    :url => "/project/:id/:style/:basename.:extension",
    :path => ":rails_root/public/project/:id/:style/:basename.:extension"

	validates :project_title, :short_description, :project_type, :long_description, :presence => true

end
