$(function(){ 
  function buildHTML(message){
   var img = message.image? `<img src=${message.image} ></img>` : ""

    var html =
      `<div class="message" data-message-id="${message.id}">
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

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.message').last().data('message-id');
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: 'api/messages',
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      messages.forEach(function(message) {
      
        insertHTML += buildHTML(message);
      
    });
    $('.messages').append(insertHTML);
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
  })
  .fail(function(data){
    alert('自動更新に失敗しました。')
  })
  }
  setInterval(reloadMessages, 5000);
  }
});