$(document).on("turbolinks:load",function(){
  $(function(){
    var search_list = $("#user-search-result");
    var member_list = $("#member_search_result");
  function appendUser(user){
      var html = `
                <div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
                </div>
                `
                return html;
    }
  function appendErr(){
      var html = `
                 <div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">ユーザーが見つかりません</p>
                 </div>`
                 return html;
   }

   function appendMembers(name, user_id) {
    var html =`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                <input name='group[user_ids][]' type='hidden' value=${ user_id }>
                <p class='chat-group-user__name'>${ name }</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
              </div>`

              member_list.append(html);
            }

   $('#user-search-field').on("keyup",function() {

  var input = $("#user-search-field").val();//指定した要素が持つvalue値を取得
    $.ajax({
      type: 'GET',   //HTTPメソッド
      url: '/users',      //users_controllerの、indexアクションにリクエストの送信先を設定する
      dataType: 'json',
      data: {keyword: input}  //テキストフィールドに入力された文字を設定する
    })
    
    .done(function(users) {
      console.log(users)
      search_list.empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          var html = appendUser(user);
          search_list.append(html)
        });
      }
      else {
        var html = appendErr();
        search_list.append(html)
      }
    })
    .fail(function() {
      alert("ユーザー検索に失敗しました");
    })

    $(function(){
      $(document).on('click', '.user-search-add', function() {
        var name = $(this).data("user-name");
        var user_id = $(this).data("user-id");
        $(this).parent().remove();
        appendMembers(name, user_id);
      });
        
    $(document).on('click', '.user-search-remove', function(){
     $(this).parent().remove();
      });
    });
  });
})
})