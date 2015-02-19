/* Inform the backgrund page that 
 * this tab should have a page-action */
chrome.runtime.sendMessage({
    from:    'content',
    subject: 'showPageAction'
});


/* Listen for message from the popup */
chrome.runtime.onMessage.addListener(function(msg, sender, response) {
    /* Validate the message's structure */
    if ((msg.from === 'popup') && (msg.subject === 'status')) {
        var x = document.links;
		var href;
		var linkFound = false;
		var linkText= "";


		if (window.find("unsubscrib")){


			/* Loop through all links */
			for (i = 0; i < x.length; i++) {
				/*Find all unsubscribe links*/
				linkText = x[i].text;
				if (linkText.indexOf("Unsubscribe") > -1 ||	linkText.indexOf("unsubscribe") > -1 ){
			    	linkFound = true;
			    	href = x[i].href;
			    	break;
			    }

			    else if (linkText.indexOf("click here") > -1 || linkText.indexOf("here") > -1 || linkText.indexOf("Here") > -1 ){
			    	linkFound = true;
			    	href = x[i].href;
			    }
			}

		}

		
		var info = {
			isLink: linkFound,
			url: href
		};

		// Directly respond to the sender (popup) through setInfo()
        response(info);
    }

});


