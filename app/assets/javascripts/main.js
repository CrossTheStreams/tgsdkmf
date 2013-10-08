animations_active = false;

// Thanks Internet!
// http://stackoverflow.com/questions/3614944/how-to-get-random-element-in-jquery
jQuery.fn.random = function() {
  var randomIndex = Math.floor(Math.random() * this.length);  
  return jQuery(this[randomIndex]);
};

function rando_seconds() {
  return(Math.max(2000, (Math.random() * 9000)) )
}

$(document).ready(function() {

 setTimeout(function() {
   $('#submit-modal').modal()  
 },100)

 $('#close-submit').on('click',function() {
   setTimeout(function(){
     animations_active = false;
     ui_helpers.animate_ellipsis($('.title-ellipsis'))
   },1500);
   $('#submit-modal').modal('hide')   
 });

 $('#submit-rant').on('click',function() {
   $('#submit-modal').modal('hide')   
   user_actions.submit_rant() 
 });

  $('#link-input_').on('focus',function(){
    console.log('stuff')
  })

  ui_helpers.animate_ellipsis($('.title-ellipsis'))

  setInterval(function() {
    var random_ellipsis = $('.ellipsis:in-viewport').random();
    ui_helpers.animate_ellipsis(random_ellipsis);
  },rando_seconds())

});


ui_helpers = {
  new_rant : function(string,link,radix) {
    var r = $('.rant').first().clone(),
    rant_list = $('#rant-list')
    r.find('h3').text('... '+string)
    r.attr('data-radix',radix)
    r.find('a').first().attr('href',request_path+'/post/'+radix)
    if (link == '') {
      r.find('.rant-link').addClass('hide')
    }
    else {
      r.find('.rant-link').removeClass('hide')
      r.find('.rant-link').attr('href',ui_helpers.ensure_link(link)) 
    }
    r.css('display;none') 
    rant_list.prepend(r)
    r.css('margin-top',-r.height())
    r.fadeIn('fast',function() {
      r.animate({
        'margin-top':0   
      },500) 
    });
  },
  animate_ellipsis: function(ellipsis) { 
    if (!animations_active) {
      var arr = ["",".","..","..."]
      for (var i = 0; i < arr.length; i += 1) {
        var str = arr[i]
        ui_helpers.ellipsis_text(ellipsis,str,i)
      } 
    }
  },
  ellipsis_text: function(ellipsis,str,n) {
    setTimeout(function() {   
      $(ellipsis).text(str)
    },700*n) 
  },
  scroll_rant_visible: function() {
    var n = $('.rant').length - 2,
    scroll_rant = $('.rant:eq('+n+')')
    return(scroll_rant.is(':in-viewport'))
  },
  ensure_link : function(link){
    return('http://'+link.replace('http://',''))
  },
  fade_in_rant: function(fade_in_rant,n) {
    setTimeout(function() {
      $('#rant-list').append(fade_in_rant)
      fade_in_rant.attr('data-hidden','false') 
      fade_in_rant.animate({
        'opacity' : '1'
      },500)   
    },500*n)  
  }
}

user_actions = {
  submit_rant: function() {
    var rant_text = $('#rant-input').val(),
      link_text = $('#link-input_').val();
      d_text = $('#description-input').val()

    $.ajax({
      url: '/rants/create',
      type: 'POST',
      data: {rant:$('#rant-input').val(),link:$('#link-input_').val(),description:d_text},
      success: function(data) {
        setTimeout(function() {
          ui_helpers.new_rant(rant_text,link_text,data['radix']); 
        },500)
      }
    }) 
  },
  bottom_scroll_check: function() {
    if (ui_helpers.scroll_rant_visible() && !animations_active) {
      r = $('.rant').last().attr('data-radix')
      $.ajax({
        url: '/rants/scroll/'+r,
        dataType: 'HTML',
        beforeSend: function() {
          ui_helpers.animate_ellipsis()
          animations_active = true;
        },
        success: function(data) {
          var hidden_rants = $(jQuery.parseHTML(data)).filter('.rant[data-hidden=true]')
          for (var i = 0; i < hidden_rants.length; i += 1) {
            var fade_in = $(hidden_rants[i])
            ui_helpers.fade_in_rant(fade_in,i)
          }
          setTimeout(function(){
            animations_active = false; 
          },5000)
        }
      }) 
    }  
  }               
}

