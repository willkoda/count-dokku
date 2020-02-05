Rails.application.routes.draw do
    # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    mount ActionCable.server, at: '/cable'
    root to: 'pages#home'

    get '/home', to: 'pages#home'

    scope :post do
        get  '/new-post',    to: 'posts#new_post'
        post '/create-post', to: 'posts#create_post'
    end

    scope :chat_room, as: :chat_room do
        get '/home',         to: 'chat_room#home_chat_room'
    end
end
