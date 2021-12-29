console.log('print.js被加载了~')
function print() {
    const content = 'hello print 666'
    console.log(content)()
}

export default print