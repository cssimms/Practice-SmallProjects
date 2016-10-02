Rails.application.routes.draw do
  root to: 'applicants#new'

  resources :applicants, only: [:create, :update, :show, :new]
  resources :funnels, only: [:index]

end
