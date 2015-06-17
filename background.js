function goNLP(info,tab) {
	//write in console
    console.log("Word " + info.selectionText + " was clicked.");
   
    //some variables
    var query = info.selectionText;
    var sentiment,stem_porter,stem_lancaster,stem_wordnet,stem_snowball,pos_tagged,pos_sexpr,pos_iob,p_ner;
	//interaction with server for sentimental analysis
	$.ajax({

  		type: "POST",

  		url:"http://text-processing.com/api/sentiment/",

 		data: { text : query },

 		success: function(data, status){ sentiment=data; },

  		dataType: 'json',

  		async:false

	});
    console.log("interaction with server for sentimental analysis");
    //interaction with server for stemming(porter)
    $.ajax({

        type: "POST",

        url:"http://text-processing.com/api/stem/",

        data: { text : query , stemmer : 'porter'},

        success: function(data, status){ stem_porter=data; },

        dataType: 'json',

        async:false

    });
    console.log("interaction with server for stemming(porter)");
    //interaction with server for stemming(lancaster)
    $.ajax({

        type: "POST",

        url:"http://text-processing.com/api/stem/",

        data: { text : query , stemmer : 'lancaster'},

        success: function(data, status){ stem_lancaster=data; },

        dataType: 'json',

        async:false

    });
    console.log("interaction with server for stemming(lancaster)");
    //interaction with server for stemming(wordnet)
    $.ajax({

        type: "POST",

        url:"http://text-processing.com/api/stem/",

        data: { text : query , stemmer : 'wordnet'},

        success: function(data, status){ stem_wordnet=data; },

        dataType: 'json',

        async:false

    });
    console.log("interaction with server for stemming(wordnet)");
    //interaction with server for stemming(snowball)
    $.ajax({

        type: "POST",

        url:"http://text-processing.com/api/stem/",

        data: { text : query , stemmer : 'snowball', language : 'english'},

        success: function(data, status){ stem_snowball=data; },

        dataType: 'json',

        async:false

    });
    console.log("interaction with server for stemming(snowball)");
    //interaction with server for Part-of-Speech Tagging and Chunking(tagged)
    $.ajax({

        type: "POST",

        url:"http://text-processing.com/api/tag/",

        data: { text : query , output : 'tagged'},

        success: function(data, status){ pos_tagged=data; },

        dataType: 'json',

        async:false

    });
    console.log("interaction with server for Part-of-Speech Tagging and Chunking(tagged");
    //interaction with server for Part-of-Speech Tagging and Chunking(sexpr)
    $.ajax({

        type: "POST",

        url:"http://text-processing.com/api/tag/",

        data: { text : query , output : 'sexpr'},

        success: function(data, status){ pos_sexpr=data; },

        dataType: 'json',

        async:false

    });
    console.log("interaction with server for Part-of-Speech Tagging and Chunking(sexpr)");

    //interaction with server for Part-of-Speech Tagging and Chunking(iob)
    $.ajax({

        type: "POST",

        url:"http://text-processing.com/api/tag/",

        data: { text : query , output : 'iob'},

        success: function(data, status){ pos_iob=data; },

        dataType: 'json',

        async:false

    });
    console.log("interaction with server for Part-of-Speech Tagging and Chunking(iob)");
    //interaction with server for Phrase Extraction & Named Entity Recognition
    $.ajax({

        type: "POST",

        url:"http://text-processing.com/api/phrases/",

        data: { text : query },

        success: function(data, status){ p_ner=data; },

        dataType: 'json',

        async:false

    });
    console.log("interaction with server for Phrase Extraction & Named Entity Recognition");
    var all_keys = Object.keys(p_ner);

	var getSampleHTML = function() {
        var op_string1 =  'javascript:\'<!doctype html><html>' +
            '<title>NLP SUITE</title>' +
            '<body>' +
            '<h1>Welcome to NLP SUITE!</h1>'+
			'<h2 id ="query">You queried for : '+query+' </h2>'+
			'<h2 id ="output">Output is : </h2>' +

            '<p> <b> Stemmed Text(porter) = '+stem_porter.text+
            '</b> </p>'+
            '<p> <b> Stemmed Text(lancaster) = '+stem_lancaster.text+
            '</b> </p>'+
            '<p> <b> Stemmed Text(wordnet) = '+stem_wordnet.text+
            '</b> </p>'+
            '<p> <b> Stemmed Text(snowball) = '+stem_snowball.text+
            '</b> </p>'+
            '<p> <b> POS Tagging(tagged) = '+pos_tagged.text+
            '</b> </p>'+
            '<p> <b> POS Tagging(sexpr) = '+pos_sexpr.text+
            '</b> </p>'+
            '<p> <b> POS Tagging(iob) = '+pos_iob.text+
            '</b> </p>';
        var op_string2 = '<p> <b> Phrase Extraction & Named Entity Recognition = </b> </p>';
        
        for (var i in p_ner){
            op_string2 += '<p><b>' + i + ' = ' ;
            for (var j = 0 ; j <p_ner[i].length-1;j++){
                op_string2+= p_ner[i][j] + ', ';
            }
            op_string2 = op_string2 + p_ner[i][p_ner[i].length-1] + '</b></p>';
        }
        

        var op_string3 = '<p> <b> Sentiment = '+sentiment.label+
            '</b><br>Probabilities :<br>'+
            'Positivity = '+sentiment.probability.pos+
            '<br>Negativity = '+sentiment.probability.neg+
            '<br>Neutral = '+sentiment.probability.neutral+
            ' </p>'+

            '</body>' +
            '</html>\'';
            return op_string1+op_string2+op_string3;
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