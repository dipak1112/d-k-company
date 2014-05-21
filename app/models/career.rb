class Career < ActiveRecord::Base
	validates :title,:experience,:involvement, :presence => true
end
