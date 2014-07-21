class Contact < ActiveRecord::Base
	validates :email, :name, :message, :presence => true
end
