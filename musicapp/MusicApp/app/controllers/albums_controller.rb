class AlbumsController < ApplicationController
  def new
    @band = Band.find(params[:band_id])

    @album = Album.new(band_id: params[:band_id])
  end

  def create
    @album = Album.new(album_params)
    if @album.save
      redirect_to band_url(@album.band_id)
    else
      fail
      flash.now[:errors] = @album.errors.full_messages
      render :new
    end
  end

  def edit
    @album = Album.find(params[:id])
    if @album
      render :edit
    else
      redirect_to bands_url
    end
  end

  def update
    @album = Album.find(params[:id])
    if @album.update(album_params)
      redirect_to band_url(@album.band_id)
    else
      flash.now[:errors] = @album.errors.full_messages
      render :edit
    end
  end

  def destroy
    @album = Album.find(params[:id])
    if @album
      @album.destroy
      redirect_to band_url(@album.band_id)
    else
      flash[:errors] = "Album not Found"
      redirect_to band_url(@album.band_id)
    end
  end

  def album_params
    params.require(:album).permit(:name, :live)
  end
end
