function setStatus(status) {
    document.getElementById('status').textContent   = status;
}

function setInfo(info) {
    var isLink = info.isLink;
    url = info.url;
    if (isLink){
        setStatus("");
        document.getElementById('yesButton').style.display = 'inline';
        document.getElementById('noButton').style.display = 'inline';
    
    }
    else
        setStatus("No unsubscribe link found.");
}


function quit(){
    window.close();
}

function unsubscribe(){
    setStatus("Unsubscribing");
    document.getElementById('yesButton').style.display = 'none';
    document.getElementById('noButton').style.display = 'none';
    chrome.tabs.create({ url: url });

}

function findUnsubscribe(){
    document.getElementById('yesButton').style.display = 'none';
    document.getElementById('noButton').style.display = 'none';

    setStatus("Unsubscribing now...");
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {

        /* Send a request for the unsubscribe info... */
        chrome.tabs.sendMessage(
                tabs[0].id,
                {from: 'popup', subject: 'status'},
                /* Specifya callback to be called 
                 *    from the receiving end (content script) */
                setInfo);
    });


}

var url = "";

/*First - find a link to unsubscribe from*/
setStatus("Looking for unsubscribe link.");
/*Wait for DOMContent to load*/
window.addEventListener('DOMContentLoaded', findUnsubscribe);

document.getElementById('yesButton').addEventListener('click', unsubscribe);
document.getElementById('noButton').addEventListener('click', quit);
