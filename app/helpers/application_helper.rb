module ApplicationHelper
  include ActionView::Helpers::SanitizeHelper

  def display_error_messages(errors, fields=[])
    error_message = []
    fields.each do |field|
      errors.messages[field].each { |error| error_message <<  "#{field.to_s.humanize} #{error}" } if errors.messages[field]
    end
    if error_message.size > 1
      (error_message.empty?)? '' : "#{error_message.first}"
    else
      (error_message.empty?)? '' : "#{error_message.join(', ')}"
    end
  end

end
