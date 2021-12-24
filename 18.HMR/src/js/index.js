import '../css/iconfont.css'
import '../css/index.less'
import print from './print'

console.log('index.js文件重新加载了~')

print()
function add(x, y) {
    return x + y
}

console.log(add(2, 3))

if (module.hot) {
    module.hot.accept('./print.js', function() {
        //方法会监听print.js文件的变化，一旦发生变化，其他模块不会重新打包构建
        //会执行后面的回调函数
        print()
    })
}