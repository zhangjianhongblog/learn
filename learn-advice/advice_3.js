/* 
    3、减少全局变量污染
*/

/* 
    1、全局变量削弱了程序的灵活性，应该避免使用全局变量。
    2、努力减少使用全局变量的方法: 在应用程序中创建唯一一个全局变量，并定义该变量为当前应用的容器。
*/

// var f = 'value';
// window.f = 'value';
// f = value;

var My = {};
My.name = {
    'first-name': 'first',
    'last-name': 'last',
};
My.work = {
    number: 123,
    one: {
        name: 'one',
        time: '2012-09-14 12:25',
        city: 'beijing',
    },
    two: {
        name: 'two',
        time: '2018-9-12 13:01',
        city: 'taiyuan',
    }
};

var foo = function () {
    var a = 1,b = 2;
    var bar = function () {
        var b = 3,c = 4;
        a += b + c;
        console.log(b,c); // 3,4
    }
    bar();
    console.log(a,b); // 8,2
}
foo();
