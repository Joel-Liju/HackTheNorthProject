let allLinks = [];
let visibleLinkObj = [];
let test = '';
let allInfo = [];

// Display all links.
function showLinks() {
  let ulTag = document.getElementById('contents');

  while (ulTag.children.length >= 1) {
    ulTag.removeChild(ulTag.children[ulTag.children.length - 1]);
  }

  for (i = 0; i < visibleLinkObj.length; i++) {
    console.log(visibleLinkObj[i]['title']);
    var line = document.createElement('div');
    var it = document.createElement('a');
    it.append(visibleLinkObj[i]['title']);
    it.href = visibleLinkObj[i]['link'];
    line.append(it);
    ulTag.append(line);

    var horizontalLine = document.createElement('hr');
    horizontalLine.setAttribute('class', 'horL');
    ulTag.append(horizontalLine);
  }
}

// filter links and reshow links
function filterLinks() {
  let filterValue = document.getElementById('filter').value;

  if (!filterValue) {
    visibleLinkObj=[];
    allInfo.forEach((i)=>{
      visibleLinkObj.push(i);
    });
    showLinks();
  } else {
    let terms = filterValue.split(' ');
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
    showLinks();
  }
}

// get the links and populate the lists
var docLinks = localStorage.getItem('links');
allInfo = JSON.parse(docLinks);
allInfo.forEach((i) => {
  console.log(i.link);
  visibleLinkObj.push(i);
});
showLinks();

document.getElementById('filter').oninput = filterLinks;
