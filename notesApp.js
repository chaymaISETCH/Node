let fs = require("fs")
let opt =process.argv[2]
if(opt==="list"){

	fs.readFile("notes.json","utf8",(err,data)=>{
	if(err) console.log("error")
	let obj = JSON.parse(data)
	if(obj.length ===0)
		console.log("0 notes")
	for(let i=0;i<obj.length;i++){

		console.log("Title: ",obj[i].title)
		console.log("Body: ",obj[i].body)

	}})
}

if(opt==="read"){
	if(process.argv.length<5)
		console.log("Missing requred arguments : title")
	else{
		fs.readFile("notes.json","utf8",(err,data)=>{
			let obj = JSON.parse(data)

			var found = obj.find((e)=> {
			return e.title ===process.argv[4];
			});
			if(!found)
				console.log("Not found")
			else{
				
				console.log("Note found \n -- \nTitle: ",found.title,"\nBody: ",found.body)
			}

})}}


if(opt==="add"){
	if(process.argv.length<6)
		console.log("Missing requred arguments : title, body")
	else{
		fs.readFile("notes.json","utf8",(err,data)=>{
			let obj = JSON.parse(data)
			let newNote = {title:process.argv[4],body:process.argv[6]}
			obj.push(newNote)	
			let jsonArr = JSON.stringify(obj);	
			fs.writeFile('notes.json', jsonArr, 'utf8', 
			(err)=>{
				if (err) throw err;
				console.log("Note created \n -- \nTitle: ",newNote.title,"\nBody: ",newNote.body)

			}
			
			);	
			})

}}

if(opt==="remove"){
	if(process.argv.length<5)
		console.log("Missing requred arguments : title")
	else{
		fs.readFile("notes.json","utf8",(err,data)=>{
			let obj = JSON.parse(data)
				
			let jsonArr = JSON.stringify(obj.filter(e=>e.title !== process.argv[4]));	
			fs.writeFile('notes.json', jsonArr, 'utf8', 
			(err)=>{
				if (err) throw err;
				console.log("Note removed \n -- \nTitle: ",process.argv[4])

			}
			
			);	
			})

}}
