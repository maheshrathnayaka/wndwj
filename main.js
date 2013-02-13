
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

function get_user_by_pid(pid) {
   // todo :
}

function wndwj_block() {

    chrome.extension.sendRequest({method: 'loadConfig'}, function(response) {
        var regdate = response.regdate;
        var score = response.score;
        var blacklist = JSON.parse(response.blacklist);

        var btstr = "<a id='kick' class='kick' href='###' ";
            btstr += ' onmouseover="style.color=\'red\'"';
            btstr += ' onmouseout="style.color=\'black\'"';
            btstr += ">拉黑</a>";

        var users =[];

        $("[id^=pid]").each(function(){
            var user = {pid:$(this).attr("id")};
            users.push(user);
              
            $(this).find("em a#a_block").after(btstr);
            $(this).find("#kick").click(function(){
                alert(user.pid);
            });


        });

        users.shift(); // Don't block topic

        for (var i=0; i<users.length; i++) {
            var userstr = $("#"+users[i].pid).find("font#small9").text();
            var userset = $.trim(userstr).split(/[\s]+/);
            users[i].title = userset[0];
            users[i].score = userset[2];
            users[i].topic_count = userset[4];
            users[i].post_count = userset[8];
            users[i].regdate = convert_date(userset[10]);

            
            $("#"+users[i].pid).find("[href*=userid]").each(function() {
                    users[i].name = $(this).text();
                    users[i].id = $(this).attr("href").match(/userid=(\d+)$/)[1];
            });

            if (check_blacklist(blacklist,users[i].name) ||
                     check_regdate(regdate,users[i].regdate) ||
                     check_score(score,users[i].score)) {
               
                     $("#"+users[i].pid).addClass("gotohell").hide();

                    console.log(users[i].name);

            }
        }

   
    });
}

