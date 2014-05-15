class CreateProjectTypes < ActiveRecord::Migration
  def change
    create_table :project_types do |t|
      t.string :name
      t.boolean :active

      t.timestamps
    end
  end
end
