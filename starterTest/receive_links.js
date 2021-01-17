let allLinks = [];
let visibleLinkObj = [];
let test = '';
let allInfo = [];


// Display all links.
function showLinks() {
  let ulTag = document.getElementById('contents');
  console.log(ulTag);
  console.log(visibleLinkObj);
  while (ulTag.children.length >= 1) {
    ulTag.removeChild(ulTag.children[ulTag.children.length - 1]);
  }

    for(i=0; i<visibleLinkObj.length; i++){
      console.log(visibleLinkObj[i]["title"]);
      var line = document.createElement("div");
      var it = document.createElement("a");
      it.append(visibleLinkObj[i]["title"]);
      it.href=visibleLinkObj[i]["link"];
      line.append(it);
      ulTag.append(line);     
      
      var horizontalLine = document.createElement("hr")
      horizontalLine.setAttribute("class", "horL")
      ulTag.append(horizontalLine);
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

// get the links and populate the lists
var docLinks = localStorage.getItem("links");
allInfo = JSON.parse(docLinks);
allInfo.forEach((i) => {
  console.log(i.link);
  visibleLinkObj.push(i);  
});
showLinks();

  
document.getElementById('filter').onkeyup = filterLinks;

