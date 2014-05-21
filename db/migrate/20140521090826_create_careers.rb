class CreateCareers < ActiveRecord::Migration
  def change
    create_table :careers do |t|
      t.string :title
      t.string :experience
      t.string :involvement
      t.string :location
      t.string :package
      t.text :skills

      t.timestamps
    end
  end
end
