// Send back to the popup a deduped list of valid link URLs on this page.
// The popup injects this script into all frames in the active tab.

/*
Note: use 'var' instead of 'let' or 'const'.
If use 'let' or 'const', it will cause 'SyntaxError: Identifier 'xxx' has already been declared'
when reload a page multiple times
*/

// function generateLinkMarkup() {
var allHeadings = [...document.querySelectorAll('h1, h2,h3')];
var parsedHeadings1 = allHeadings.map((heading) => {
  return heading.innerText
    .toLowerCase()
    .replace(/\s{2,}/g, ' ')
    .split(' ')
    .join('-');
  // return {
  //   title: heading.innerText,
  //   depth: heading.nodeName.replace(/\D/g, ''),
  //   id: heading.getAttribute('id'),
  // };
});

var parsedHeadings2 = allHeadings.map((heading) => {
  return heading.innerText
    .toLowerCase()
    .replace(/\s{2,}/g, ' ')
    .split(' ')
    .join('-');
});

var headings = parsedHeadings1.concat(parsedHeadings2);
//   return parsedHeadings;
// }

// var headings = generateLinkMarkup();
// console.log(headings);

var links = [].slice.apply(document.getElementsByTagName('a'));
links = links.map(function (element) {
  // Return an anchor's href attribute, stripping any URL fragment (hash '#').
  // If the html specifies a relative path, chrome converts it to an absolute
  // URL.
  var href = element.href;
  var hashIndex = href.indexOf('#');
  if (hashIndex >= 0) {
    // console.log(href);
    var path = href.substr(hashIndex + 1);
    // console.log(path);
    if (headings.includes(path)) {
      return href;
    }
  }
  return '';
});

var filteredlinks = links.filter((link) => {
  return link !== '';
});

// links.sort();
links = Array.from(new Set(links));

// console.log(links);

chrome.extension.sendRequest(links);
