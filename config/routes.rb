Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  resources :meetings, only: [:index, :show]

  get "*path", to: "static#index", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
