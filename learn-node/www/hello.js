var f = {
    reg: /\d/g,
    valueOf(){
        return this.reg.exec(123)[0]
    }
}
if (f == 1 && f == 2 && f == 3) {
    console.log('正则打印出来了');
}