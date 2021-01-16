let allLinks = [];
let visibleLinkObj = [];
let test = '';
let allInfo = [];

// Display all links.
function showLinks(arr) {
  let ulTag = document.getElementById('contents');

  //remove childElt
  while (ulTag.children.length >= 1) {
    ulTag.removeChild(ulTag.children[ulTag.children.length - 1]);
  }

  console.log('after removing child', ulTag);
  for (let i = 0; i < arr.length; ++i) {
    // create header tag
    let headerTag;
    switch (arr[i].depth) {
      case '1':
        headerTag = document.createElement('h1');
      case '2':
        headerTag = document.createElement('h2');
      case '3':
        headerTag = document.createElement('h3');
    }
    if (headerTag) {
      headerTag.innerText = arr[i].title;
      headerTag.onclick = function () {
        chrome.tabs.update({ url: arr[i].link });
      };
    }

    //create li tag
    let liTag = document.createElement('li');

    liTag.append(headerTag);
    ulTag.append(liTag);
  }
}

// filter links and reshow links
function filterLinks() {
  let filterValue = document.getElementById('filter').value;

  if (!filterValue) {
    showLinks(allInfo);
  } else {
    let terms = filterValue.split(' ');
    // console.log('entered terms', terms);
    visibleLinkObj = allInfo.filter((i) => {
      let parsedTitle = i.title;
      let hasResult = true;
      for (let idx = 0; idx < terms.length; ++idx) {
        let term = terms[idx];
        if (term.length != 0) {
          hasResult = hasResult && -1 !== parsedTitle.indexOf(term);
        } else {
          hasResult = hasResult && true;
        }
      }
      return hasResult;
    });
    // console.log('after filtering', visibleLinkObj);
    showLinks(visibleLinkObj);
  }
}

//initialize all variables
chrome.runtime.onMessage.addListener(function (msg, _, sendResponse) {
  test = msg.greeting;
  allInfo = [...JSON.parse(msg.greeting)];
  allInfo.forEach((i) => {
    allLinks.push(i.link);
  });
  visibleLinkObj = [...allInfo];
  showLinks(visibleLinkObj);
  sendResponse({ farewell: visibleLinkObj }); //test
});

// Set up event handlers and inject send_links.js into all frames in the active tab
window.onload = () => {
  document.getElementById('filter').oninput = filterLinks;

  chrome.windows.getCurrent(() => {
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
