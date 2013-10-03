class RantController < ApplicationController

  def create
    Rant.make!(params) 
    render :nothing => true
  end

end


