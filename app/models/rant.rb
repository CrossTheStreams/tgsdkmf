class Rant < ActiveRecord::Base
  attr_accessible :rant, :link

  def self.make!(params)
    Rant.create(:rant => params[:rant].to_s, :link => params[:link].to_s)
  end

  def ensure_rant
    ret = ''
    if self.rant.length > 75
      ret = self.rant[0..71] + ' ...'
    else
      ret = self.rant 
    end
  end


  def ensure_link
    r = /(http:\/\/)/
    'http://' + self.link.gsub(r,"")
  end


end
