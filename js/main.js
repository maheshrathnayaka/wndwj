
function regdate(str) {
    if (str) {
        var arrs = str.split(" ");
        var year = arrs.pop().split("\u5e74")[0];
        if (year>=2011) {
            return true;
        }
    }
    return false;
}


chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// Add toggle button on top of navigate bar
        var toggleButton = "<button id='toggle' style=\"font-size:16px; background-color:#5B74A8;color:#fff; font-weight:bold; font-style:italic;\">wndwj</button>";
        $("#k_favorite").before(toggleButton);
        $("#toggle").click(function(){
            $(".gohell").toggle();
        });

        // Push match member to array 
        var members = [];
        var repliesCount = 0;
        $("#postlist").find("table").each(function(){
            repliesCount += 1;
            if ($(this).attr("id")==$(this).attr("summary")) {
                var hide = regdate($(this).find("font#small9").text());
                if (hide) { 
                    $(this).addClass("gohell");
                    $(this).hide();
                }
            };
        });

		// ----------------------------------------------------------

	}
	}, 10);
});

