function goNLP(info,tab) {
	//write in console
    console.log("Word " + info.selectionText + " was clicked.");
    //open a new tab
    chrome.tabs.create({ 
    	url: 'index.html'     
    });
    //some variables
    var query = info.selectionText;
    var res_data = '';
	//interaction with server
	$.ajax({

  		type: "POST",

  		url:"http://text-processing.com/api/sentiment/",

 		data: { text : query },

 		success: function(data, status){ res_data=JSON.stringify(data); },

  		dataType: 'json',

  		async:false

	});
	//print output in pop up
	alert(res_data);
}


chrome.contextMenus.create({

    title: "Process: %s", 
    contexts:["selection"], 
    onclick: goNLP

});