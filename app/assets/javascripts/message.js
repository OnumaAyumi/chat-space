$(function(){ 
  function buildHTML(message){
   var img = message.image == null ? "" : `<img src=${message.image} ></img>`

    var html =
      `<div class="message" >
        <div class="message_upper-info">
          <p class="message_upper-info__talker">
            ${message.user_name}
          </p>
          <p class="message_upper-info__date">
            ${message.date}
          </p>
        </div>
          <p class="message__text">
            ${message.content}
          </p>
          ${img}
      </div>`
     return html;
    }
 
  $(document).on("turbolinks:load",function(){

    $('#new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action')
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        var html = buildHTML(data);
        $('.messages').append(html);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');   
        $('form')[0].reset();
      })
      .fail(function(){
        alert('error');
      });
      return false;
    });
  });
})