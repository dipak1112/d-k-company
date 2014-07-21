KeshariyaCompany::Application.routes.draw do
  scope '/admin' do
    resources :careers
    resources :projects
	  resources :project_types
	  resources :pages
	  resources :testimonials
	  resources :contacts
  end

  devise_for :admin_users
  resource :admin_users, only: [:edit] do
    collection do
      patch 'update_password'
    end
  end
  
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'home#index'
  get 'about-us'       => 'home#about_us',       :as => :about_us
 #get 'contact-us'     => 'home#contact_us',     :as => :contact_us
 #post 'contact'       => 'home#contact',        :as => :contact
  match "contact-us"   => "home#contact_us",     :as => :contact_us,  via: [:get, :post]
  get 'services'       => 'home#services',       :as => :services
  get 'blogs'          => 'home#blogs',          :as => :blogs
  get 'careers'        => 'home#careers',        :as => :careers_main
  get 'portfolio-list' => 'home#portfolio_list', :as => :portfolio_list
  get '/portfolio/:id' => 'home#portfolio',      :as => :portfolio
  get '/admin'         => 'testimonials#index',  :as => :admin
  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
