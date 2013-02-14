

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

function unblockUser(name){
    var blacklist = localStorage['blacklist'];
    var index = blacklist.indexOf(name);
    if (index != -1 ) {
        blacklist.splice(index,1);
    }
    localStorage['blacklist'] = JSON.stringify(blacklist);
}

function blockUser(name){
    var blacklist = localStorage['blacklist'];
    var index = blacklist.indexOf(name);
    if (index = -1) {
        blacklist.push(name);
    }
    localStorage['blacklist'] = JSON.stringify(blacklist);
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) { 
         chrome.pageAction.show(sender.tab.id);

        if (request.method == "loadConfig") {
            sendResponse({ 
                regdate: localStorage['regdate'],
                score: localStorage['score'],
                blacklist: localStorage['blacklist']
            });
        } 
        else if (request.method == "unblock") {
            unblockUser(request.username);
            sendResponse({ok:true});
        }
        else if (request.method == "block") {
            blockUser(request.username);
            sendResponse({ok:true});
        }
        else {
            sendResponse({});
        }
});



