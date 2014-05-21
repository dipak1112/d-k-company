class CreateTestimonials < ActiveRecord::Migration
  def change
    create_table :testimonials do |t|
      t.string :client_name
      t.text :testimonial_content

      t.timestamps
    end
  end
end
