const  fs = require('fs');
const  join = require('path').join;
/**
 * 
 * @param startPath  起始目录文件夹路径
 * @returns {Array}
 */
function findSync(startPath) {
    let result=[];
    function finder(path) {
        let files=fs.readdirSync(path);
        files.forEach((val,index) => {
            let fPath=join(path,val);
            let stats=fs.statSync(fPath);
            if(stats.isDirectory()) {
                // result.push(fPath);
                // 递归读取文件夹下文件
                finder(fPath)
            };
            // 读取文件名
            if(stats.isFile()) result.push(fPath);
        });
    }
    finder(startPath);
    // console.log(result);
    return result;
}
let fileNames=findSync('./数据');

let songObj = {
    '歌唱祖国':"809",
    '我和你':"803",
    '大海啊故乡':'807',
    '我的中国心':'808',
    '青春舞曲':'804',
    '我们的田野':'409',
    '欢乐颂':"805",
    '友谊地久天长':'806',
    "雪绒花":'802',
    '少年先锋队队歌': '404',
    "小螺号":'407',
    "卖报歌":'401',
    "让我们荡起双桨":'410',
    "嘀哩嘀哩":'405',
    "小小少年":'406',
    "小白船":'408'
};

let exeName = 'SightSinging.exe';
let resultArr = [];
let xmlFileName = '../现场考试的xml/word正式/';

resultArr = fileNames.map(item => {
    let songNameArr = item.split('\\');
    return `${exeName} ../数据/${songNameArr[1]}/${songNameArr[2]} ${xmlFileName}${songNameArr[1]}.xml 结果/ ${songObj[songNameArr[1]]}`.replace(/\//g, "\\")
})

fs.writeFileSync('./run.txt',resultArr.join("\r\n"));