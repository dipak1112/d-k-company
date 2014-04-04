class AddColumnProjectsToProjects < ActiveRecord::Migration
  def change
  	add_attachment :projects, :avatar
  end
end
