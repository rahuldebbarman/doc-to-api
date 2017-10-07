var htmljs = require('./html');
let pathToDump = "./serilaizedTree";

test();

function test() {
	var test = '<div class=\'heading\'>'+
					'<h3>'+
						'<span class=\'http_method\'><a href=\'#!/Resources/get_expense_allocations_id\' class=\'toggleOperation\'>get</a></span>'+
					'</h3></div>';
					
	let testData2 = '<h3>sampleHeader</h3>';
	
	console.log('************'+(new Array(4)).map((e) => 5));

	html = htmljs(testData2);
	console.log(html);
	let tree = JSON.stringify(html);
	dumpResourcePath(tree);
}

function testLoop(){
  let childElementCount = 3;
  let arr = [1,2,3];
  let index = 0;
  while(index < childElementCount)	{
	    console.log('invoking processNodes for childNodes: ' + arr[index] );
		index = index+1;			
	}	
}

function debugHelper(){
	var jsdom = require("jsdom");
	const { JSDOM } = jsdom;
	var html = '<div class=\'heading\'>'+
						'<h3>'+
							'<span class=\'http_method\'><a href=\'#!/Resources/get_expense_allocations_id\' class=\'toggleOperation\'>get</a></span>'+
						'</h3></div>';
	var dom = new JSDOM(html);
	const body = dom.window.document.body;
	//will print class 
	console.log(body.childNodes[0].attributes[0].localName);
	//will print 'href' of a 
	console.log(body.childNodes[0].childNodes[0].childNodes[0].childNodes[0].attributes[0].localName);
	//['class']
	console.log(body.childNodes[0].getAttributeNames());
	//true
	console.log(body.childNodes[0].childNodes[0].childNodes[0].childNodes[0].hasAttributes());
	//1 as <div> has only one child in this example
	console.log(body.childNodes[0].childElementCount);
}

function dumpResourcePath(resourcePath){
	console.log("into dumpResourcePath");
	console.log(resourcePath);
	
	var fs = require("fs");  
	//var dataToWrite = 'A Solution of all Technology';  
	var dataToWrite = resourcePath;  
	// Create a writable stream  
	//var writerStream = fs.createWriteStream('output.txt');
	console.log('Going to dump here:' + pathToDump);
	var writerStream = fs.createWriteStream(pathToDump+'.txt');	
	// Write the data to stream with encoding to be utf8  
	writerStream.write(dataToWrite,'UTF8');  
	// Mark the end of file  
	writerStream.end();  
	// Handle stream events --> finish, and error  
	writerStream.on('finish', function() {  
		console.log("Write completed.");  
	});  
	writerStream.on('error', function(err){  
	   console.log(err.stack);  
	});  
	console.log("Program Ended");  
}