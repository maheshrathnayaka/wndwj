

function default_option_setup() {
    if (!localStorage['regdate']) {
        localStorage['regdate'] = '0';
    }
    if (!localStorage['score']) {
        localStorage['score'] = '0';
    }
    if (!localStorage['blacklist']) {
        localStorage['blacklist'] = JSON.stringify([]);
    }
}

default_option_setup();


chrome.extension.onRequest.addListener(function(request, sender, sendResponse) { 
         chrome.pageAction.show(sender.tab.id);

        if (request.method == "loadConfig") {
            sendResponse({ 
                regdate: localStorage['regdate'],
                score: localStorage['score'],
                blacklist: localStorage['blacklist']
            });
        }
        else {
            sendResponse({});
        }
});


