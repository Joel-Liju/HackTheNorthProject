var clicked = false;
chrome.browserAction.onClicked.addListener(async function() {
  if(!clicked){
    chrome.tabs.executeScript(null, {file: "bar.js"});
    chrome.tabs.executeScript(null, {file: "send_links.js"});
    chrome.tabs.executeScript(null, {file: "receive_links.js"});
    clicked=true;
}
});
