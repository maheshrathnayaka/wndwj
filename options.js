
var BG_PAGE = chrome.extension.getBackgroundPage();

/* function play_sound(id) { */
    // var element_id = id || 'YeahBaby';
    // var audio = document.getElementById(id);
    // audio.play();
/* } */


function init_options_page() {
    $("#regdate_select").val(BG_PAGE.localStorage["regdate"]);
    $("#score_select").val(BG_PAGE.localStorage["score"]);

    var str = "";
    var blacklist_arr = JSON.parse(BG_PAGE.localStorage['blacklist']); 
    if (blacklist_arr.length > 0) {
        str = blacklist_arr.join(" ");
    } 
    $("textarea#blacklist").val(str);
}


$(document).ready(function() {
    init_options_page();
    
    // Save options to localstorage 
    $('#savebutton').click(function() {
        BG_PAGE.localStorage['regdate'] = $("#regdate_select option:selected").val();
        BG_PAGE.localStorage['score'] = $("#score_select option:selected").val();
        var userlist = $('textarea#blacklist').val().split(' ');
        BG_PAGE.localStorage['blacklist'] = JSON.stringify(userlist);

        // Update message of configuration saved.
        var status = document.getElementById("savebutton");
        status.innerHTML = "已保存...";
        setTimeout(function() {
                status.innerHTML = "保存配置";
        }, 750);
        //play_sound('YeahBaby');
    });
});

