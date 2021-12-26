console.log('index.js文件被加载了')
import test from './test'
// console.log(test)

document.getElementById('btn').onclick = function(){
  console.log(test)
}