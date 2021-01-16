chrome.browserAction.onClicked.addListener(async function() {
  chrome.tabs.executeScript(null, {file: "bar.js"});
  chrome.tabs.executeScript(null, {file: "send_links.js"});
  chrome.tabs.executeScript(null, {file: "receive_links.js"});
});
