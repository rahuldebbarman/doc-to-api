var htmljs = require('./html');
let pathToDump = "./serilaizedTree";

testPreorder();

function preorder(root){	
	 let result = "";
	 
	 if(!root.data){
		 return result;
	 }
	 
	 result=result.concat('(');
	 result = result.concat(root.data);	 
	 let children = root.children;
	 
	 if(!children){
		 result=result.concat(')');
		 return result;
	 }
	 
	 for(let i in children){
		let currChild = children[i];
		result = result.concat(preorder(currChild));
	}
	
	result=result.concat(')'); 
	return result;
}

function test(){	
	//create a mock data firstChild
	let c5 = {data:"5", children:null};
	
	let c3 = {data:"3", children:null};
	let c4 = {data:"4", children:null};
	let c2 = {data:"2", children:[c3,c4]};//(1(2(3)(4))(5)) if null (1(2)(5))
	
	let root = {data:"1", children:[c2, c5]};
	
	console.log(preorder(root));
}

function testPreorder() {
	var test = '<div class=\'heading\'>'+
					'<h3>'+
						'<span class=\'http_method\'><a href=\'#!/Resources/get_expense_allocations_id\' class=\'toggleOperation\'>get</a></span>'+
				'</h3></div>';
					
	let testData2 = '<div><h3>sampleHeader</h3></div>';
	
	html = htmljs(testData2);
    console.log(html);
	result=preorder(html);
	dumpResourcePath(result);
	//console.log(result);
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

