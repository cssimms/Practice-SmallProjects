class BandsController < ApplicationController
  def index
    @bands = Band.all
    render :index
  end

  def show
    @band = Band.find(params['id'])
    render :show
  end

  def new
    @band = Band.new
    render :new
  end

  def edit
    @band = Band.find(params['id'])
    render :edit
  end

  def create
    @band = Band.new(band_params)
    if @band.save
      redirect_to band_url(@band)
    else
      flash[:errors] = "Invalid Band Name"
      render :new
    end
  end

  def destroy
    @band = Band.find_by(params['id'])
    @band.destroy
    flash[:destroyed] = "#{@band.name} destroyed"
    redirect_to bands_url
  end

  private
  def band_params
    params.require('band').permit('name')
  end
end
