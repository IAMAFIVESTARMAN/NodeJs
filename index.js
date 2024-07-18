const fs= require("fs")
const path=require("path")

fs.readFile(path.join(__dirname,'files','starter.txt'),'utf-8',(err,dat)=>{
    if(err) throw Error
    console.log("Read Complete");
})

console.log('Hello');


fs.writeFile(path.join(__dirname,'files','reply.txt'),'Nice to meet you',(err)=>{
    if(err) throw Error
    console.log("Write complete");
})

fs.appendFile(path.join(__dirname,'files','test.txt'),'Testing the test again',(err)=>{
    if(err) throw Error
    console.log("Append complete");
})

process.on("uncaughtException",err=>{
    console.log(`There was an error : ${err}`);
    process.exit(1)
})