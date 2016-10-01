Rails.application.routes.draw do

  resource :session, only: [:new, :create, :destroy]
  
  resources :users, only: [:new, :create] do
    resources :posts, only: [:index]
  end

  resources :posts

end
