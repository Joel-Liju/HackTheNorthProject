let allLinks = [];
let visibleLinks = [];

function test(){
  var t = document.getElementsByTagName("body")[0];
  var s = document.createElement("div");
  console.log("here");
  s.setAttribute("id","testplease")
 
  // for(let i =0;i<visibleLinks.length;i++){
  //   let row = document.createElement("a");
  //   row.setAttribute("href","#");
  //   row.innerText = visibleLinks[i];
  //   s.appendChild(row);
  // }
  t.prepend(s);
}

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
  // console.log("here test again");
  test();
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

chrome.extension.onRequest.addListener((links) => {
  for (let index in links) {
    allLinks.push(links[index]);
  }
  allLinks.sort();
  visibleLinks = allLinks;
  showLinks();
});

// Set up event handlers and inject send_links.js into all frames in the active tab
window.onload = () => {
  document.getElementById('filter').onkeyup = filterLinks;

  chrome.windows.getCurrent(function (currentWindow) {
    chrome.tabs.query(
      { active: true, windowId: currentWindow.id },
      function (activeTabs) {
        chrome.tabs.executeScript(activeTabs[0].id, {
          file: 'send_links.js',
          allFrames: true,
        });
      }
    );
  });
};
