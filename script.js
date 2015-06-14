function goNLP(info,tab) {

    console.log("Word " + info.selectionText + " was clicked.");
    chrome.tabs.create({ 

        url: "http://www.google.com/search?q=" + info.selectionText,
    })


}

chrome.contextMenus.create({

    title: "Process: %s", 
    contexts:["selection"], 
    onclick: goNLP,

});