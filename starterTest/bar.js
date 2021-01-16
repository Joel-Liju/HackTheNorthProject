
var body = document.getElementsByTagName("body")[0];

console.log(localStorage.getItem("stuff"));
//the items




// the menu bar
var bar = document.createElement("div");
bar.style.left = 0 + "px";
bar.style.top = 10 + "px";
bar.setAttribute("class", "sidebar");
bar.setAttribute("id", "1");
if(localStorage.getItem("stuff")!=null){
    var thing = localStorage.getItem("stuff");
    console.log(JSON.parse(thing));
    var jthing = JSON.parse(thing);

  //remove childElt
//   while (bar.children.length >= 1) {
//     bar.removeChild(bar.children[bar.children.length - 1]);
//   }

//   console.log('after removing child', bar);
//   for (let i = 0; i < jthing.length; ++i) {
//     // create header tag
//     let headerTag;
//     switch (jthing[i]["depth"]) {
//       case '1':
//         headerTag = document.createElement('h1');
//       case '2':
//         headerTag = document.createElement('h2');
//       case '3':
//         headerTag = document.createElement('h3');
//     }
//     if (headerTag) {
//       headerTag.innerText = jthing[i]["title"];
//       headerTag.onclick = function () {
//         chrome.tabs.update({ url: jthing[i]["link"] });
//       };
//     }

//     //create li tag
//     let liTag = document.createElement('li');

//     liTag.append(headerTag);
//     bar.append(liTag);
//   }







    for(i=0;i<jthing.length;i++){
        console.log(jthing[i]["title"]);
        var line = document.createElement("div");
        var it = document.createElement("a");
        it.append(jthing[i]["title"]);
        it.href=jthing[i]["link"];
        line.append(it);
        bar.append(line);       
    }
}
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
