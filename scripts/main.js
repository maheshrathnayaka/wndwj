chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
        var mydatat = [];
        $("#postlist").find("table").each(function(){
            if ($(this).attr("id")==$(this).attr("summary")) {
                var tohide = regdate($(this).find("font#small9").text());
                if (tohide) {
                    $(this).hide();
                }
            };
        });




		// ----------------------------------------------------------

	}
	}, 10);
});

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

/*     $(document).ready(function(){ */
        // var mydatat = [];
        // $("#postlist").find("table").each(function(){
            // if ($(this).attr("id")==$(this).attr("summary")) {
                // var tohide = regdate($(this).find("font#small9").text());
                // if (tohide) {
                    // $(this).hide();
                // }
            // };
        // });
    // });
