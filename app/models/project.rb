class Project < ActiveRecord::Base

	#extend FriendlyId
  #friendly_id :slug, use: :history
	belongs_to :project_type
	has_attached_file :avatar, 
    :styles => { :pfolio_e => "550x650!",:pfolio => "355x289!" },
    :url => "/project/:id/:style/:basename.:extension",
    :path => ":rails_root/public/project/:id/:style/:basename.:extension"

	validates_attachment_content_type :avatar, :content_type => ["image/jpg", "image/jpeg", "image/png"]

	validates :project_title, :short_description, :project_type_id, :long_description, :presence => true

end
