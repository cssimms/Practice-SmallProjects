class UsersController < ApplicationController
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
      redirect_to users_url, status: 200
    else
      flash.now[:error] = "Username already Exists"
      render :new, status:422
    end
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  def edit
    @user = User.find(params[:id])
    render :edit
  end

  def update
    @user = User.new(user_params)
    if @user.save
      render :show
    else
      flash.now[:error] = "Invalid username! Try again."
      render :edit, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:user_name)
  end
end
