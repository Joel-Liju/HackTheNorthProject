let allLinks = [];
let visibleLinkObj = [];
let test = '';
let allInfo = [];


// Display all links.
function showLinks() {
  let ulTag = document.getElementById('contents');
  console.log(ulTag);
  for (let i = 0; i < visibleLinkObj.length; ++i) {
    // create header tag
    let headerTag;
    // test
    // console.log('visibleLinkObj[i].depth', visibleLinkObj[i].depth);
    // console.log('visibleLinkObj[i].title', visibleLinkObj[i].title);
    // console.log('visibleLinkObj[i].link', visibleLinkObj[i].link);
    switch (visibleLinkObj[i].depth) {
      case '1':
        headerTag = document.createElement('h1');
        console.log('match h1');
      case '2':
        headerTag = document.createElement('h2');
        console.log('match h2');
      case '3':
        headerTag = document.createElement('h3');
        console.log('match h3');
    }
    if (headerTag) {
      headerTag.innerText = visibleLinkObj[i].title;
      headerTag.onclick = function () {
        chrome.tabs.update({ url: visibleLinkObj[i].link });
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

  let terms = filterValue.split(' ');
  visibleLinkObj = allInfo.filter((i) => {
    let link = i.link;
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

//initialize all variables
chrome.runtime.onMessage.addListener(function (msg, _, sendResponse) {
  alert(msg.greeting)
  test = msg.greeting;
  allInfo = [...JSON.parse(msg.greeting)];
  allInfo.forEach((i) => {
    allLinks.push(i.link);
  });
  visibleLinkObj = [...allInfo];
  showLinks();
  sendResponse({ farewell: visibleLinkObj }); //test
});





// Set up event handlers and inject send_links.js into all frames in the active tab
// window.onload = () => {
  
  document.getElementById('filter').onkeyup = filterLinks;

  // chrome.windows.getCurrent(function (currentWindow) {
  //   chrome.tabs.query(
  //     { active: true, currentWindow: true },
  //     function (activeTabs) {
        // chrome.tabs.executeScript(activeTabs[0].id, {
        //   file: 'send_links.js',
        //   allFrames: true,
        // });
  //     }
  //   );
  // });
// };
