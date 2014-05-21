class AddAttachmentClientPictureToTestimonials < ActiveRecord::Migration
  def self.up
    change_table :testimonials do |t|
      t.attachment :client_picture
    end
  end

  def self.down
    drop_attached_file :testimonials, :client_picture
  end
end
