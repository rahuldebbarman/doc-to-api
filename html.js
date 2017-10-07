const { JSDOM } = require('jsdom');
const { embedding } = require('./dict');

const parseNode = (node) => {
    return {
        data: processNode(node),        
		children: processChild(node, node.childNodes)		
    }
}

const processChild = (parent, childNodes) => {	
	 let parsedChildArr = [];
	 let childElementCount = parent.childElementCount;
	 console.log('childElementCount: '+childElementCount);
	 
	// for(let i in childNodes){   
    let index = 0;
    while(index < childElementCount)	{
	    console.log('invoking processNodes for childNodes: ' + childNodes[index] + ' and parent node: '+ parent);			
		let node = parseNode(childNodes[index]);
		parsedChildArr = parsedChildArr.concat(node);
		index = index+1;
	 }
	 
	return parsedChildArr;
}

const processNode = (node) => {
	var listOfTexts = [];
	
	// 1. Take text of the node
	if(node.nodeType == 3){//a raw text
		var text = node.textContent;
		listOfTexts = listOfTexts.concat(splitIntoWords(text));		
	}
	else{//it is an element
		// 1. Take tag name
		console.log('Logging node: '+node);
		var tagName = node.tagName.toLowerCase();
		console.log('Logging nodes tagName: '+tagName);		
		
		listOfTexts.push(tagName);
		// 2. Take all attributes and values	
		/*node.attributes.each(function(){
			//console.log('attr key:' + this.nodeName +' attr value:'+ this.nodeValue);
			listOfTexts.push(this.nodeName.toLowerCase());
			var textList = splitIntoWords(this.nodeValue);
			listOfTexts = listOfTexts.concat(textList);
		})*/
		
		//new			
		if(node.hasAttributes()){
			console.log( node.tagName +' has attributes');				
			var attrsPerNode = node.getAttributeNames();
			for(let i in attrsPerNode){
				let currAttr = attrsPerNode[i];
				console.log('going to check attr: ' + currAttr);
				var textList = splitIntoWords(currAttr);
				let attrVal = node.getAttribute(currAttr);
				let parsedAtrrVal = splitIntoWords(attrVal);
				listOfTexts = listOfTexts.concat(textList);
				listOfTexts = listOfTexts.concat(parsedAtrrVal);
			}
		}		
			
		
	}
    console.log('Logging listOfText: ' + listOfTexts);
    // 4. Calculate vector from dict
	return embedding(listOfTexts);
}

const splitIntoWords = (text) => {
	return text.toLowerCase().split(/[^a-zA-Z0-9]+/);
}

module.exports = (html) => {
    const dom = new JSDOM(html);
    const body = dom.window.document.body;
    return parseNode(body);
};