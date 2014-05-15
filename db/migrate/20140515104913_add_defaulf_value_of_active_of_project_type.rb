class AddDefaulfValueOfActiveOfProjectType < ActiveRecord::Migration
  def change
  	change_column :project_types, :active, :boolean, default: true
  end
end