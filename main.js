
function check_blacklist(blacklist,name) {
    // return True = block this user
    return (jQuery.inArray(name, blacklist) != -1) 
}

function check_regdate(regdate,userRegdate) {
    const oneDay = 86400000;
    // return True = block this user
    return (userRegdate + (oneDay*regdate)) > new Date().getTime() ;
}

function check_score(score,userScore) {
    // return True = block this user
    return userScore < score;
}

function convert_date(gdate){
    var datelist = gdate.split(/[年,月]/);
    var newdate = "01/"+datelist[1]+"/"+datelist[0];
/*     console.log(newdate); */
    /* console.log(new Date(newdate).getTime()); */
    // ******* 01/03/2012 =  1325520000000  ******
    return new  Date(newdate).getTime();
}


chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);
        // ---------------------------------------
		// Add toggle button on top of navigate bar
        var toggleButton = "<button id='toggle' style=\"font-size:16px; background-color:#5B74A8;color:#fff; font-weight:bold; font-style:italic;\">wndwj</button>";
        $("#k_favorite").before(toggleButton);
        $("#toggle").click(function(){
            $(".gotohell").toggle();
        });
         

	    wndwj_block();
        
        // ---------------------------------------
	}
	}, 10);
});

function set_user_by_pid(user) {
    var userstr = $("#"+user.pid).find("font#small9").text();
    var userset = $.trim(userstr).split(/[\s]+/);
    user.title = userset[0];
    user.score = userset[2];
    user.topic_count = userset[4];
    user.post_count = userset[8];
    user.regdate = convert_date(userset[10]);

    $("#"+user.pid).find("[href*=userid]").each(function() {                                       
            user.name = $(this).text();
            user.id = $(this).attr("href").match(/userid=(\d+)$/)[1];
    });
}

function wndwj_block() {

    chrome.extension.sendRequest({method: 'loadConfig'}, function(response) {
        var regdate = response.regdate;
        var score = response.score;
        var blacklist = JSON.parse(response.blacklist);

        var kick_bt = "<a id='kick' class='kick' href='###' ";
            kick_bt += ' onmouseover="style.color=\'red\'"';
            kick_bt += ' onmouseout="style.color=\'black\'"';
            kick_bt += "></a>";

        var users =[];

        $("[id^=pid]").each(function(){
            var user = {pid:$(this).attr("id")};
            set_user_by_pid(user);
            users.push(user);

            // Todo: uncomment below will add kick_bt on page
            //$(this).find("em a#a_block").after(kick_bt);

            if (check_blacklist(blacklist,user.name)) {
                $(this).find("#kick").text("不拉黑");  
            } else {
                $(this).find("#kick").text("拉黑");
            }

            $(this).find("#kick").click(function(){ 
                //Todo: something ERRRRRROOOOR........
                if (check_blacklist(blacklist,user.name)) {
                    chrome.extension.sendRequest({method: 'unblock',username: user.name}, function(response){
                    });
                    $(this).text("拉黑");
                    console.log(user.name);
                } else {
                    chrome.extension.sendRequest({method: 'block',username: user.name}, function(response){
                       chrome.extension.getBackgroundPage().console.log('foo');
                    });
                    $(this).text("不拉黑");
                    console.log(user.name);
                }
            }); 

        });

        users.shift(); // Don't block topic

        for (var i=0; i<users.length; i++) {

            if (check_blacklist(blacklist,users[i].name) ||
                     check_regdate(regdate,users[i].regdate) ||
                     check_score(score,users[i].score)) {
               
                     $("#"+users[i].pid).addClass("gotohell").hide();

            }
        }

   
    });
}

