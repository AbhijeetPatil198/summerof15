function goNLP(info,tab) {

    console.log("Word " + info.selectionText + " was clicked.");
    
    chrome.tabs.create({ 
    	url: 'index.html'     
    });


    var txt = info.selectionText;

	
	$.post("http://text-processing.com/api/sentiment/", {'text': "great"}, 
	function(data, status){ alert(JSON.stringify(data));}
	,"json" );
  
}


chrome.contextMenus.create({

    title: "Process: %s", 
    contexts:["selection"], 
    onclick: goNLP,

});