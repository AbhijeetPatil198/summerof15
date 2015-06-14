function goNLP(info,tab) {

    console.log("Word " + info.selectionText + " was clicked.");
    
    chrome.tabs.create({ 
    	url: "http://www.google.com/search?q=" + info.selectionText,      
    });


    var txt = info.selectionText;


    $.post("http://text-processing.com/api/sentiment/", {text: "great"}, function(data,status){
    	alert('fuck1');
    	alert(status);
    	
    });

    //alert('fuck');

}

chrome.contextMenus.create({

    title: "Process: %s", 
    contexts:["selection"], 
    onclick: goNLP,

});