$(document).ready(function() {

 setTimeout(function() {
   $('#submit-modal').modal()  
 },100)

 $('#close-submit').on('click',function() {
   $('#submit-modal').modal('hide')   
 });

 $('#submit-rant').on('click',function() {
   $('#submit-modal').modal('hide')   
   user_actions.submit_rant() 
 });

 $('#link-input_').on('focus',function(){
   console.log('stuff')
 })

});

ui_helpers = {
  new_rant : function(string,link) {
    var r = $('.rant').first().clone(),
    rant_list = $('#rant-list')
    r.find('h3').text('... '+string)
    r.find('.rant-link').attr('href',ui_helpers.ensure_link(link))
    r.css('display;none') 
    rant_list.prepend(r)
    r.css('margin-top',-r.height())
    r.fadeIn('fast',function() {
      r.animate({
        'margin-top':0   
      },500) 
    });
  }
  ensure_link : function(link){
    return('http://'+link.replace('http://',''))
  }
}
user_actions = {
  submit_rant: function() {
    var rant_text = $('#rant-input').val(),
      link_text = $('#link-input_').val();
    setTimeout(function() {
      ui_helpers.new_rant(rant_text,link_text); 
    },1000)
    $.ajax({
      url: '/rant/create',
      type: 'POST',
      data: {rant: $('#rant-input').val(),link:$('#link-input').val()}
    }) 
  }
}

