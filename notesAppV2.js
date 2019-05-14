let fs = require("fs")
const argv = require('yargs').argv


switch(argv._[0]){
	case "list":{	
		fs.readFile("notes.json","utf8",(err,data)=>{
			if(err) console.log("error")
			let obj = JSON.parse(data)
			if(obj.length ===0)
				console.log("0 notes")
			for(let i=0;i<obj.length;i++){
		
				console.log("Title: ",obj[i].title)
				console.log("Body: ",obj[i].body)
		
			}})
	}break;
	case "read":{
		if(!argv.title)
			console.log("Missing requred arguments : title")
		else{
			fs.readFile("notes.json","utf8",(err,data)=>{
			let obj = JSON.parse(data)
			let found = obj.find((e)=> {
				return e.title ===argv.title;
			});
			if(!found)
				console.log("Not found")
			else{
				
				console.log("Note found \n -- \nTitle: ",found.title,"\nBody: ",found.body)
			}

	})}
	}break;
	case "remove":{
		if(!argv.title)
			console.log("Missing requred arguments : title")
		else{
			fs.readFile("notes.json","utf8",(err,data)=>{
			let obj = JSON.parse(data)
				
			let jsonArr = JSON.stringify(obj.filter(e=>e.title !== argv.title));	
			fs.writeFile('notes.json', jsonArr, 'utf8', 
			(err)=>{
				if (err) throw err;
				console.log("Note removed \n -- \nTitle: ",argv.title)

			}
			
			);	
			})

}
	}break;
	case "add" : {
		if(!argv.title ||!argv.body)
			console.log("Missing requred arguments : title, body")
		else{
			fs.readFile("notes.json","utf8",(err,data)=>{
			let obj = JSON.parse(data)
			let newNote = {title:argv.title,body:argv.body}
			obj.push(newNote)	
			let jsonArr = JSON.stringify(obj);	
			fs.writeFile('notes.json', jsonArr, 'utf8', 
			(err)=>{
				if (err) throw err;
				console.log("Note created \n -- \nTitle: ",argv.title,"\nBody: ",argv.body)

			}
			
			);	
			})

}}break;

}







