// console.log('Test');
// console.log(global);

const os=require("os")
const path=require('path')
// const math=require('./math')

const {add,sub,mul,div}=require('../math')

// console.log(os.version(),os.type(),os.homedir());
// console.log(__dirname,"+",__filename)
// console.log(path.dirname(__filename))
// console.log(path.basename(__filename));
// console.log(path.extname(__filename));
// console.log(path.parse(__filename))

console.log(add(2,3))
console.log(sub(2,3))
console.log(mul(2,3))
console.log(div(2,0))