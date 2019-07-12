// 1、isStatic : 检测数据是不是除了symbol外的原始数据

function isStatic(value) {
    return (
        typeof value === 'string' ||
        typeof value === 'boolean' || 
        typeof value === 'number' ||
        typeof value === 'undefined' ||
        value === null
    )
}

// 2、isPrimitive: 检测数据是不是原始数据
function isPrimitive(value) {
    return isStatic(value) || typeof value === 'symbol';
}

// 3、isObject:判断数据是不是引用类型的数据（例如：arrays，functions，objects，regexes，new Number(0),以及 new String('')）;
function isObject(value) {
    return value !== null && (typeof value === 'object' || typeof value === 'function')
}

// 4、isObjectLike： 检查 value 是否是类对象。如果一个值是类对象，那么它不应该是 null ，而且 typeof 后的结果是 'object'
function isObjectLike(value) {
    return value !== null && typeof value === 'object';
}

// 5、getRawType: 获取数据类型。返回结果为Number、String、Object、Array等
function getRawType(value) {
    return Object.prototype.toString.call(value).slice(8,-1);
}

// 6、isPlainObject:判断数据是不是Object类型的数据
function isPlainObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}

// 7、isArray:判断数据是不是数组类型的数据
function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
}
// 将 isArray 挂载到 Array 上
// Array.isArray = Array.isArray || isArray;

// 8、isRegExp: 判断数据是不是正则对象
function isRegExp(value) {
    return Object.prototype.toString.call(value) === '[object RegExp]';
}

// 9、isDate: 判断数据是不是时间对象
function isDate(value) {
    return Object.prototype.toString.call(value) === '[object Date]';
}

// 10、isNative:判断value是不是浏览器内置函数
// 内置函数toString后的主体代码块为[native code] ，而非内置函数则为相关代码，所以非内置函数可以进行拷贝（toString后掐头去尾再由Function转）
function isNative(value) {
    return typeof value === 'function' && /native code/.test(value.toString());
}

// 11、isFunction: 检查 value 是不是函数
function isFunction(value) {
    return Object.prototype.toString.call(value) === '[object Function]';
}

// 12、isLength : 检查 value 是否为有效的类数组长度
function isLength(value) {
    return typeof value === 'number' && value > -1 && value % 1 === 0 && value <= Number.MAX_SAFE_INTEGER;
}

// 13、isArrayLike: 检查 value 是否是类数组
// 如果一个值被认为是类数组，那么它不是一个函数，并且value.length是个整数，大于等于0，小于等于 Number.MAX_SAFE_INTEGER。这里字符串也将被当作类数组。
function isArrayLike(value) {
    return value !== null && isLength(value) && !isFunction(value);
}


// 14、isEmpty: 检查 value 是否为空
// 如果是null，直接返回true，如果是类数组，判断数据长度；如果是Object对象，判断是否具有属性；如果是其他数据，直接返回false（也可改为返回true）
function isEmpty(value) {
    if (value === null) return true;
    if (isArrayLike(value)) {
        return !value.length;
    } else if (isPlainObject(value)) {
        for (let key in value) {
            if (hasOwnProperty.call(value,key)) {
                return false;
            }
        }
    }
    return false;
}

// 15、cached: 记忆函数：缓存函数的运行结果
function cached(fn) {
    let cache = Object.create(null);
    return function cachedFn(str) {
        let hit = cache[str];
        return hit || (cache[str] = fn(str));
    }
}

// 16、camelize： 横线转驼峰命名
let camelizeRE = /-(\w)/g;
function camelize(str) {
    return str.replace(camelizeRE,function (_, c) {
        return c ? c.toUpperCase() : '';
    })
}
// ab-cd-ef => abCdEf
// 使用记忆函数
let _camlize = cached(camelize);
console.log(_camlize('ab-cd-ef'));


// 17、hyphenate: 驼峰命名转横线命名;拆分字符串，使用 - 相连，并且转换为小写
let hyphenateRE = /\B([A-Z])/g;
function hyphenate(str) {
    return str.replace(hyphenateRE,'-$1').toLowerCase();
}
// abCdEf => ab-cd-ef
// 使用记忆函数
let _hyphenate = cached(hyphenate);
console.log(_hyphenate('abCdEf'));


// 18、capitalize: 字符串首位大写
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
// asc => Abc
// 使用记忆函数
let _capitalize = cached(capitalize);
console.log(_capitalize('abc'));

// 19、extend:将属性混合到目标对象中
function extend(to, _from) {
    for(let key in _form) {
        to[key] = _from[key];
    }
    return to;
}

// 20、Object.assign： 对象属性复制，浅拷贝
Object.assign = Object.assign || function () {
    if (arguments.length === 0) throw new TypeError('Cannot convert undefined or null to object');
    let traget = arguments[0],
        args = Array.prototype.slice.call(arguments,1);
    args.forEach(function(item){
        for(let key in item) {
            item.hasOwnProperty(key) && (traget[key] = item[key])
        }
    })
    return traget;
}

// 使用 Object.assign 可以浅克隆一个对象
// let clone = Object.assign({},target);
// 简单的深克隆可以使用 JSON.parse() 和 JSON.stringify(),这两个api是解析json数据的，所以只能解析除symbol外的原始类型及数组和对象
// let clone = JSON.parse(JSON.stringify(target));

// 21、clone:克隆数据，可深度克隆
// 这里列出了原始类型，时间、正则、错误、数组、对象的克隆规则，其他的可自行补充

function clone(value,deep) {
    if (isPrimitive(value)) {
        return value;
    }

    if (isArrayLike(value)) { // 是类数组
        value = Array.prototype.slice.call(value);
        return value.map(item => deep ? clone(item,deep): item);
    } else if (isPlainObject(value)) {  // 是对象
        let target = {};
        for (let key in value) {
            value.hasOwnProperty(key) && (target[key] = deep ? clone(value[key],deep) : value[key])
        }
    } 

    let type = getRawType(value);

    switch(type) {
        case "Date":
        case "RegExp":
        case "Error":
            value = new window[type](value);
            break;
    }
    return value;
}

// 22、识别各种浏览器及平台
// 运行环境是浏览器
let inBrowser = typeof window !== 'undefined';
// 运行环境是微信
let inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
let weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
// 浏览器 UA 判断
let UA = inBrowser && window.navigator.userAgent.toLowerCase();
let isIE = UA && /msie|trident/.test(UA);
let isIE9 = UA && UA.indexOf('msie 9.0') > 0;
let isEdge = UA && UA.indexOf('edge/') > 0;
let isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
let isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
let isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge; 

// 23、getExplorerInfo : 获取浏览器信息

function getExplorerInfo() {
    let t = navigator.userAgent.toLowerCase();
    return 0 <= t.indexOf("msie") ? { //ie < 11
        type: "IE",
        version: Number(t.match(/msie ([\d]+)/)[1])
    } : !!t.match(/trident\/.+?rv:(([\d.]+))/) ? { // ie 11
        type: "IE",
        version: 11
    } : 0 <= t.indexOf("edge") ? {
        type: "Edge",
        version: Number(t.match(/edge\/([\d]+)/)[1])
    } : 0 <= t.indexOf("firefox") ? {
        type: "Firefox",
        version: Number(t.match(/firefox\/([\d]+)/)[1])
    } : 0 <= t.indexOf("chrome") ? {
        type: "Chrome",
        version: Number(t.match(/chrome\/([\d]+)/)[1])
    } : 0 <= t.indexOf("opera") ? {
        type: "Opera",
        version: Number(t.match(/opera.([\d]+)/)[1])
    } : 0 <= t.indexOf("Safari") ? {
        type: "Safari",
        version: Number(t.match(/version\/([\d]+)/)[1])
    } : {
        type: t,
        version: -1
    }
}

// 24、isPCBroswer : 检测是否为PC端浏览器模式
function isPCBroswer(){
    let e = window.navigator.userAgent.toLowerCase(),
        t = 'ipad' === e.match(/ipad/i),
        i = 'iphone' === e.match(/iphone/i),
        r = 'midp' === e.match(/midp/i),
        n = 'rv:1.2.3.4' === e.match(/rv:1.2.3.4/i),
        a = 'ucweb' === e.match(/ucweb/i),
        o = 'android' === e.match(/android/i),
        s = 'windows ce' === e.match(/windows ce/i),
        l = 'windows mobile' === e.match(/windows mobile/i);

    return !(t || i || r || n || a || o || s || l);
}

// 25、unique : 数组去重，返回一个新数组

function unique(arr) {
    if (!isArrayLike(arr)) { // 不是类数组对象
        return arr;
    }

    let result = [];
    let objarr = [];
    let obj = Object.create(null);

    arr.forEach(item => {
        if (isStatic(item)) { // 是除了symbol以外的原始数据
            let key = item + "_" + getRawType(item);
            if (!obj(key)) {
                obj[key] = true;
                result.push(item)
            }
        } else { // 引用类型及symbol
            if (!objarr.includes(item)) {
                objarr.push(item);
                result.push(item);
            }
        }
    })
    return result;
}

// 26、 set简单实现
window.Set = window.Set || ((function() {
    function Set(arr) {
        this.items = arr ? unique(arr) : [];
        this.size = this.items.length; // Array的大小
    }
    Set.prototype = {
        add: function (value) {
            // 添加元素，若元素已存在，则跳过，返回 Set 结构本身。
            if (!this.has(value)) {
                this.items.push(value);
                this.size++;
            }
            return this;
        },
        clear: function () {
            // 清除所有成员，没有返回值
            this.items = [];
            this.size = 0;
        },
        delete: function (value) {
            // 删除某个值，返回一个布尔值，表示删除是否成功；
            return this.items.some((v,i) => {
                if (v === vlaue) {
                    this.items.splice(i,1);
                    return true;
                }
                return false;
            })
        },
        has: function (value) {
            // 返回一个布尔值，表示该值是否为Set的成员
            return this.items.some(v => v === value);
        },
        values: function () {
            return this.items;
        }
    }
    return Set;
})())

// 27、repeat: 生成一个重复的字符串，有n个str组成，可修改为填充为数组等。

function repeat(str, n) {
    let res = '';
    while(n) {
        if (n % 2 === 1) {
            res += str;
        }
        if (n > 1) {
            str += str;
        }
        n >>=1;
    }
    return res;
}
console.log(repeat('123',3))