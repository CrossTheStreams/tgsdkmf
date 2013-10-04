class Rant < ActiveRecord::Base
  require 'bijective'
  attr_accessible :rant, :link, :description
  after_create :ensure_radix

  def self.make!(params)
    Rant.create(:rant => params[:rant].to_s, :link => params[:link].to_s, :description => params[:description].to_s)
  end

  def ensure_rant
    ret = ''
    if self.rant.to_s.length > 75

      ret = self.rant[0..71] + ' ...'
    else
      ret = self.rant 
    end
  end


  def ensure_link
    r = /(http:\/\/)/
    'http://' + self.link.gsub(r,"")
  end

  def ensure_radix
    if self.radix.instance_of?(String)
      ensured_radix = self.radix
    else
      ensured_radix = bijective_encode(self.id)  
      self.update_attribute(:radix,ensured_radix)
    end
    ensured_radix
  end



end
