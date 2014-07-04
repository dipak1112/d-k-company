RailsAdmin.config do |config|

  ### Popular gems integration
  config.authenticate_with do
    warden.authenticate! scope: :admin_user
  end
  config.current_user_method &:current_admin_user

  #config.excluded_models << "AdminUser"

  ## == Cancan ==
  # config.authorize_with :cancan

  ## == PaperTrail ==
  # config.audit_with :paper_trail, 'User', 'PaperTrail::Version' # PaperTrail >= 3.0.0config.main_app_name = Proc.new { |controller| [ "Cool app", "BackOffice - #{controller.params[:action].try(:titleize)}" ] }

  config.main_app_name = [ "Apsolute Technologies", "Admin" ]

  ### More at https://github.com/sferik/rails_admin/wiki/Base-configuration

  config.actions do
    dashboard                     # mandatory
    index                         # mandatory
    new do
      except ["Contact", "Page"]
    end
    export
    show
    edit do
      except ["Contact", "AdminUser"]
    end
    delete do
      except ["Page"]
    end
    show_in_app

    ## With an audit adapter, you can add:
    # history_index
    # history_show
  end

  config.navigation_static_links = {
    'Change Password' => '/admin_users/edit'
  }

  config.model "AdminUser" do
    list do
      field :email
      field :sign_in_count
      field :current_sign_in_at
      field :current_sign_in_ip
      field :last_sign_in_at
      field :last_sign_in_ip
    end

    create do
      field :email
      field :password
      field :password_confirmation
    end
  end

  config.model "Career" do
    list do
      field :title
      field :experience
      field :involvement
      field :location
    end
  end

  config.model "Contact" do
    list do
      field :name
      field :email
      field :message
    end
  end

  config.model "Page" do
    list do
      field :name
      field :page_content
    end

    # delete do
    #   visilbility false
    # end
  end

  config.model "ProjectType" do
    list do
      field :name
      field :active
    end
  end

  config.model "Project" do
    create do
      exclude_fields :slug
    end

    edit do
      exclude_fields :slug
    end

    list do
      field :project_title
      field :short_description
      field :is_new_project
      field :project_type
      field :avatar
    end
  end

  config.model "Testimonial" do
    list do
      field :client_name
      field :testimonial_content
    end
  end
end
