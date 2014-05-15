class ProjectType < ActiveRecord::Base
	validates :name, :presence => true
	validates_uniqueness_of :name, :message => "Already taken"
end
