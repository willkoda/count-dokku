Rails.application.routes.draw do
    # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    root to: 'pages#home'

    get '/home', to: 'pages#home'

    scope :post do
        get  '/new-post',    to: 'posts#new_post'
        post '/create-post', to: 'posts#create_post'
    end
end
