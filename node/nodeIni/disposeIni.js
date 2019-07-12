const fs = require('fs');
const join = require('path').join;
const xlsx = require('node-xlsx');
let headerCont = [
    '学生ID',
    '综合',
    '表现',
    '流畅性',
    '音准',
    '节奏',
    '歌词'
]; // 头部信息

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
                finder(fPath)
            };
            let fileContent = fs.readFileSync(fPath,{
                encoding:'utf8'
            });

            // 不包含，无法识别的文件
            // if (fileContent.split(',').length === 7) {
            //    if(stats.isFile()) result.push(getContent(fileContent));
            // }
            // 包含，无法识别的文件
            if(stats.isFile()) result.push(getContent(fileContent));
        });
    }
    finder(startPath);
    // console.log(result);
    return result;
}

function getContent(content){
    let tempArr = content.split(',');
    if (tempArr.length < 7) {
        return [tempArr[0],'不对','不对','不对','不对','不对','不对']
    }
    tempArr = tempArr.map((item,index) => {
        if (item.indexOf(':') === -1) return item;
        if (index === (tempArr.length -1)) {
            return Number(item.split(':')[1].slice(0,1));
        } else {
            return Number(item.split(':')[1]);
        }
    })
    return tempArr;
}
let fileNames=findSync('./数据');
fileNames.unshift(headerCont);
// console.log(fileNames);
let excelData = [
    {
        name:'sheet1',
        data:fileNames
    }
]
// 写xlsx
var buffer = xlsx.build(excelData);
fs.writeFile('./resut.xlsx', buffer, (err) => {
    if (err) throw err;
    console.log('已经成功生成excel');
});
