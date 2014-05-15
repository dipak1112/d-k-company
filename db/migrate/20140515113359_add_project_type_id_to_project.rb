class AddProjectTypeIdToProject < ActiveRecord::Migration
  def self.up
  	add_column :projects, :project_type_id, :integer
  	Project.all.each do |project|
  		type = ProjectType.find_by(name: project.project_type)
  		if !(type.present?)
  			type = ProjectType.create(name: project.project_type)
  		end
  		project.update_attributes(project_type_id: type.id)
  	end
    remove_column :projects, :project_type
  end

  def self.down
  	add_column :projects, :project_type, :string
  	Project.all.each do |project|
  		project.update_attributes(project_type: ProjectType.find(project.project_type_id).name)
  	end
    remove_column :projects, :project_type_id
  end
end
