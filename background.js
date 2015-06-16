function goNLP(info,tab) {
	//write in console
    console.log("Word " + info.selectionText + " was clicked.");
   
    //some variables
    var query = info.selectionText;
    var res_data;
	//interaction with server
	$.ajax({

  		type: "POST",

  		url:"http://text-processing.com/api/sentiment/",

 		data: { text : query },

 		success: function(data, status){ res_data=data; },

  		dataType: 'json',

  		async:false

	});


	var getSampleHTML = function() {
        return 'javascript:\'<!doctype html><html>' +
            '<title>Chrome NLP</title>' +
            '<body style="width: 400px">' +
            '<h1>Welcome to Chrome NLP!</h1>'+
			'<h2 id ="query">You queried for : '+query+' </h2>'+
			'<h2 id ="output">Output is : </h2>' +
            '<p> Sentiment = '+res_data.label+
            '<br>Probabilities :<br>'+
            'Positivity = '+res_data.probability.pos+
            '<br>Negativity = '+res_data.probability.neg+
            '<br>Neutral = '+res_data.probability.neutral+
            ' </p>'+
            '</body>' +
            '</html>\'';
    };
    chrome.tabs.create({ 
    	url: getSampleHTML()     
    });
}


chrome.contextMenus.create({

    title: "Process: %s", 
    contexts:["selection"], 
    onclick: goNLP

});