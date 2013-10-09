class RantsController < ApplicationController

  def create
    rant = Rant.make!(params) 
    Rails.logger.info(params.inspect)
    render :json => {:radix => rant.ensure_radix}
  end

  def scroll
    last_rant = Rant.find_by_radix(params[:radix])
    if last_rant
      idx = last_rant.id - 1
      @rants = Rant.where(:id => (idx-19)..idx).order('id DESC')
    end
    render layout: false
  end

  def show
    @rant = Rant.find_by_radix(params[:radix])
    redirect_to root_path if !@rant 
  end

end


