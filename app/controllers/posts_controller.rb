class PostsController < ApplicationController
    def new_post
        @post = Post.new
    end

    def create_post
        Post.create!(post_params)
        redirect_to root_path
    end

    private

    def post_params
        params.require(:post).permit(
            :caption,
            :image
        ) 
    end
end