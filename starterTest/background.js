var tabsClicked = {};

// when the user clicks on the extension icon
chrome.browserAction.onClicked.addListener(async function() {
  chrome.tabs.query({active: true}, function(tabs){  
    // check if current tab has clicked on the extension icon before
     if (!tabsClicked[`${tabs[0].id}`]) {
      chrome.tabs.executeScript(null, {file: "bar.js"});
      chrome.tabs.executeScript(null, {file: "send_links.js"});
      chrome.tabs.executeScript(null, {file: "receive_links.js"});
      // add current tab to tabs that have the extension
      tabsClicked[`${tabs[0].id}`] = true;
    }
    else {
      // remove extension from current tab
      chrome.tabs.executeScript(null, {file: "removeExtension.js"});
      tabsClicked[`${tabs[0].id}`] = false;
    }
    }); 
});
