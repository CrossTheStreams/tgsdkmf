class RantController < ApplicationController

  def create
    Rant.make!(params) 
    Rails.logger.info(params.inspect)
    render :nothing => true
  end

end


