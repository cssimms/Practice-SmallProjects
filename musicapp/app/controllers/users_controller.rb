class UsersController < ApplicationController
  def show
    @user = User.find_by(params[:id])
    render :show
  end

  def index
    @users = User.all
    render :index
  end

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login_user!(@user)
      redirect_to users_url
    else
      flash[:errors] = "Bad Credentials"
      render :new
    end
  end

  private
  def user_params
    params.require('user').permit('email', 'password')
  end
end
