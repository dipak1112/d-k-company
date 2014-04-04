class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :project_title
      t.string :short_description
      t.string :project_type
      t.text :long_description
      t.boolean :is_new_project

      t.timestamps
    end
  end
end
