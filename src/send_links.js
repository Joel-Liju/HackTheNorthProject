// store the links in local storage

/*
Note: use 'var' instead of 'let' or 'const'.
If use 'let' or 'const', it will cause 'SyntaxError: Identifier 'xxx' has already been declared'
when reload a page multiple times

Note: sortedTitleObj is final object
*/

var allHeadings = [...document.querySelectorAll('h1, h2,h3')];
var allTitleObj = []; // store all title objects including content title and its hierarchy
var heading1Obj = []; // store objects including title in parsedHeadings1 and its hierarchy
var parsedHeadings1 = allHeadings.map((heading) => {
  var title1 = heading.innerText
    .toLowerCase()
    .replace(/\s{2,}/g, ' ')
    .split(' ')
    .join('-');

  var depth1 = heading.nodeName.replace(/\D/g, ''); // depth: 1 means h1 tag, depth:2 means h2 tag..
  allTitleObj.push({ title: title1, depth: depth1 });
  heading1Obj.push({ title: title1, depth: depth1 });
  return title1;
});

var parsedHeadings2 = allHeadings.map((heading) => {
  var title2 = heading.innerText
    .toLowerCase()
    .replace(/\s{2,}/g, ' ')
    .split(' ')
    .join('-');

  var depth2 = heading.nodeName.replace(/\D/g, '');
  allTitleObj.push({ title: title2, depth: depth2 });
  return title2;
});

var headings = parsedHeadings1.concat(parsedHeadings2);

var sortedRawTitle = heading1Obj.map((h) => {
  return { title: h.title.split(/-|_/).join(' '), depth: h.depth };
});

//remove duplicate according to title property
sortedRawTitle = sortedRawTitle.filter(
  (it, index, self) => index === self.findIndex((t) => t.title === it.title)
);

var links = [].slice.apply(document.getElementsByTagName('a'));
links = links.map(function (element) {
  var href = element.href;
  var hashIndex = href.indexOf('#');
  if (hashIndex >= 0) {
    var path = href.substr(hashIndex + 1);
    if (headings.includes(path)) {
      return href;
    }
  }
  return '';
});

// filter out empty string
var filteredlinks = links.filter((link) => {
  return link !== '';
});

// filter out duplicated string
links = Array.from(new Set(filteredlinks));

// mathing path and link
var linkObjs = [];
var pathesWithoutPunc = [];
links.forEach((l) => {
  var hashIndex2 = l.indexOf('#');
  var subLink = l
    .substr(hashIndex2 + 1)
    .split(/-|_/)
    .join(' ');
  linkObjs.push({
    path: subLink,
    link: l,
  });
  pathesWithoutPunc.push(subLink);
});

// get sorted title
var sortedTitleObj = [];
var sortedTitle = sortedRawTitle.filter((t) => {
  if (pathesWithoutPunc.includes(t.title)) {
    var relatedLinkIndex = pathesWithoutPunc.findIndex((p) => {
      return p.includes(t.title);
    });
    sortedTitleObj.push({
      title: t.title,
      link: linkObjs[relatedLinkIndex].link,
      depth: t.depth,
    });
    return true;
  }
  return false;
});
// console.log('sortedTitle', sortedTitle);
// console.log('=====================');
// console.log('sortedTitleObj', sortedTitleObj);

localStorage.setItem('links', JSON.stringify(sortedTitleObj));
