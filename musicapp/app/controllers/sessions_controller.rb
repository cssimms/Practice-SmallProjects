class SessionsController < ApplicationController

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.find_by_credentials(session_params[:email], session_params[:password])
    if @user
      login_user!(@user)
      redirect_to user_url(@user)
    else
      flash.now[:errors] = "Invalid Login Info"
      render :new
    end
  end

  def destroy
    logout_user!
    redirect_to new_session_url
  end

  private
  def session_params
    params.require('user').permit('email', 'password')
  end
end
