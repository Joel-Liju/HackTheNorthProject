let allLinks = [];
let visibleLinks = [];
let test = '';
let allInfo = [];

// Display all links.
function showLinks() {
  let linksTable = document.getElementById('links');
  while (linksTable.children.length > 1) {
    linksTable.removeChild(linksTable.children[linksTable.children.length - 1]);
  }
  for (let i = 0; i < visibleLinks.length; ++i) {
    let row = document.createElement('tr');
    let col0 = document.createElement('td');
    let col1 = document.createElement('td');
    col1.innerText = visibleLinks[i];
    col1.style.whiteSpace = 'nowrap';
    row.appendChild(col0);
    row.appendChild(col1);
    linksTable.appendChild(row);
  }
}

// filter links and reshow links
function filterLinks() {
  let filterValue = document.getElementById('filter').value;

  let terms = filterValue.split(' ');
  visibleLinks = allLinks.filter(function (link) {
    for (let termI = 0; termI < terms.length; ++termI) {
      let term = terms[termI];
      if (term.length != 0) {
        let expected = term[0] != '-';
        if (!expected) {
          term = term.substr(1);
          if (term.length == 0) {
            continue;
          }
        }
        let found = -1 !== link.indexOf(term);
        if (found != expected) {
          return false;
        }
      }
    }
    return true;
  });

  showLinks();
}

chrome.runtime.onMessage.addListener(function (msg, _, sendResponse) {
  test = msg.greeting;
  allInfo = [...JSON.parse(msg.greeting)];
  allInfo.forEach((i) => {
    allLinks.push(i.link);
  });
  visibleLinks = allLinks;
  showLinks();
  sendResponse({ farewell: allInfo });
});

// Set up event handlers and inject send_links.js into all frames in the active tab
window.onload = () => {
  document.getElementById('filter').onkeyup = filterLinks;

  chrome.windows.getCurrent(function (currentWindow) {
    chrome.tabs.query(
      { active: true, currentWindow: true },
      function (activeTabs) {
        chrome.tabs.executeScript(activeTabs[0].id, {
          file: 'send_links.js',
          allFrames: true,
        });
      }
    );
  });
};
