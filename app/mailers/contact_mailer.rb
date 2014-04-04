class ContactMailer < ActionMailer::Base

  default from: "apsolutetechnology@gmail.com"
  
  def contact_get_detail(contact)
    @contact = contact
    mail(to: "apsolutetechnology@gmail.com", subject: 'Detail From #{contact.name}')
  end

end
