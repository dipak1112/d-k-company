class Page < ActiveRecord::Base
	validates :name,:page_content, :presence => true
	validates_uniqueness_of :name
end
