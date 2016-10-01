class SessionsController < ApplicationController

  def new
    redirect_to posts_url if current_user
    @user = User.new
    render :new
  end

  def create
    user = User.validate_login_credentials(
      params[:user][:username],
      params[:user][:password])

    if user
      user.reset_session_token!
      session[:session_token] = user.session_token
      redirect_to posts_url
    else
      flash.now[:errors] = "INVALID CREDENTIALS"
      render :new
    end
  end

  def destroy
    current_user.reset_session_token!
    session[:session] = nil
    redirect_to new_session_url
  end
end
