var body = document.getElementsByTagName("body")[0];

// the menu bar
var bar = document.createElement("div");
bar.style.left = 0 + "px";
bar.style.top = 10 + "px";
bar.setAttribute("class", "sidebar");
bar.setAttribute("id", "1");
body.prepend(bar);

// create a tab on the side of the bar menu to be able to close the bar menu
var tab = document.createElement("button");
tab.setAttribute("class", "bartab");
tab.style.left = "12em";
tab.style.top = "2.5em";
bar.prepend(tab);

// create the tab that will be shown when the menu is closed
var closedTab = document.createElement("button");
closedTab.setAttribute("class", "bartab");
closedTab.style.left = "0px";
closedTab.style.top = "2.5em";
closedTab.style.visibility = "hidden";
body.prepend(closedTab);

// functionality to close the menu
tab.onclick = () => {
    document.getElementById("1").style.visibility = "hidden";
    closedTab.style.visibility = "visible";
}

// functionality to open the menu back up
closedTab.onclick = () => {
    document.getElementById("1").style.visibility = "visible";
    closedTab.style.visibility = "hidden";
}
