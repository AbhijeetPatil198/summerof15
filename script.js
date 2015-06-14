function goNLP(info,tab) {

    console.log("Word " + info.selectionText + " was clicked.");
    
    chrome.tabs.create({ 
    	url: "http://www.google.com/search?q=" + info.selectionText,      
    });


    var txt = info.selectionText;


    $.post("http://text-processing.com/api/sentiment/", {text: "great"}).done( function(msg) { } )
    .fail( function(xhr, textStatus, errorThrown) {
        alert(xhr.responseText);
    });
    
}

chrome.contextMenus.create({

    title: "Process: %s", 
    contexts:["selection"], 
    onclick: goNLP,

});