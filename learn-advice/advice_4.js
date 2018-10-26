/* 
    4、注意 JavaScript 数据类型的特殊性
*/

/* 
    1、防止浮点数溢出
        a、浮点数中的整数运算是精确的，所有小数表现出来的问题可以通过指定精度来避免
    2、慎用 JavaScript 类型自动转换
    3、正确检测数据类型
    4、避免误用parseInt
        a、在使用parseInt的时候，一定要写第二个参数
*/

// var num = 0.1 + 0.2;
// console.log(num);

// var num = (1 + 2) / 10;
// console.log(num);

// var num = 1;
// console.log(typeof num); // number
// console.log(num.constructor); // [Function: Number]

// var  str = 'a';
// console.log(typeof str); // string
// console.log(str.constructor); // [Function String]

// var value = true;
// console.log(typeof value); // boolean
// console.log(value.constructor); // [Function: Boolean]

// var value = {};
// console.log(typeof value); // object
// console.log(value.constructor); // [Function: Object]

// var value = new Object();
// console.log(typeof value); // object
// console.log(value.constructor); // [Function: Object]

// var value = [];
// console.log(typeof value); // object
// console.log(value.constructor); // [Function: Array]


// var value = new Array();
// console.log(typeof value); // object
// console.log(value.constructor); // [Function: Array]


// var value = function() {};
// console.log(typeof value); // function
// console.log(value.constructor); // [Function: Function]

// function value() {};
// console.log(typeof value); // function
// console.log(value.constructor); // [Function: Function]

// var value = undefined;
// console.log(typeof value); // undefined
// console.log(value && value.constructor); // undefined


// var value = null;
// console.log(typeof value); // object
// console.log(value && value.constructor); // null

// var value = 12;
// console.log(typeof value);
// console.log(value instanceof Number);
// console.log(value.constructor);
// console.log(Object.prototype.toString.call(value));

/**
 * 功能：检测 JavaScript 基本数据类型和内置对象
 * 参数：o 表示检测的值
 * 返回值： 返回字符串：'undefined'/'number'/'boolean'/'string'/'function'/'regexp'/'array'/'date'/'error'/'object'/'null'/'symbol'
 */
function typeOf(o) {
    var _toString = Object.prototype.toString;
    // 获取对象的toString() 方法引用
    // 列举基本数据类型和内置对象类型，可以进一步补充该数组的检测数据类型范围
    var _type = {
        'undefined': 'undefined',
        'number': 'number',
        'boolean': 'boolean',
        'string': 'string',
        'symbol': 'symbol',
        '[object Function]': 'function',
        '[object RegExp]': 'regexp',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object Error]': 'error',
    };
    return _type[typeof o] || _type[_toString.call(o)] || (o ? 'object':'null');
}
// console.log(typeOf(undefined));
// console.log(typeOf(null));
// console.log(typeOf(1));
// console.log(typeOf('1'));
// console.log(typeOf(Symbol('123')));
// console.log(typeOf(true));
// console.log(typeOf([]));
// console.log(typeOf({}));
// console.log(typeOf(new Date()));
// console.log(typeOf(new RegExp()));
// console.log(typeOf(new Error()));
// console.log(typeOf(function fn(){}));

// console.log(parseInt('4.23'));
// console.log(parseInt('1we'));
// console.log(parseInt('.11'));
// console.log(parseInt('17'));
// console.log(parseInt('17 int'));

// console.log(parseInt('010'));
// var d = '010';
// console.log(parseInt(d));
// console.log(parseInt('0x10'));
// console.log(parseInt('08'));
// console.log(parseInt('0b9'));
// console.log(parseInt('0b10'));

console.log(parseInt('123abc',16));

console.log(parseInt('10',2));
console.log(parseInt('10',8));
console.log(parseInt('10',10));