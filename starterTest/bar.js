var body = document.getElementsByTagName('body')[0];

// the menu bar
var bar = document.createElement('div');
bar.style.left = 0 + 'px';
bar.style.top = 10 + 'px';
bar.setAttribute('class', 'sidebar');
bar.setAttribute('id', '1');
body.prepend(bar);

// add the filter box to the bar
var filterSearch = document.createElement('input');
filterSearch.setAttribute('type', 'text');
filterSearch.setAttribute('placeholder', 'Filter');
filterSearch.setAttribute('id', 'filter');
filterSearch.setAttribute('class', 'filter');
bar.prepend(filterSearch);

// add space after the filter box
var space = document.createElement('div');
space.innerText = '.';
bar.append(space);

// add unordered list element to the bar
var content = document.createElement('ul');
content.setAttribute('id', 'contents');
content.setAttribute('class', 'contents');
bar.append(content);

// create a tab on the side of the bar menu to be able to close the bar menu
var tab = document.createElement('button');
tab.setAttribute('class', 'bartab');
tab.style.left = '12.85em';
tab.style.top = '2.5em';
bar.prepend(tab);

// create the tab that will be shown when the menu is closed
var closedTab = document.createElement('button');
closedTab.setAttribute('class', 'bartab');
closedTab.style.left = '0px';
closedTab.style.top = '2.5em';
closedTab.style.visibility = 'hidden';
body.prepend(closedTab);

// functionality to close the menu
tab.onclick = () => {
  document.getElementById('1').style.visibility = 'hidden';
  closedTab.style.visibility = 'visible';
};

// functionality to open the menu back up
closedTab.onclick = () => {
  document.getElementById('1').style.visibility = 'visible';
  closedTab.style.visibility = 'hidden';
};
