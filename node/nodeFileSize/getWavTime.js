const fs = require('fs');
const join = require('path').join;

let headerCont = [
    '学生ID',
    '歌曲名称',
    '时长（秒）',
]; // 头部信息

const SONG_NAME = '我和你';

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
            if(stats.isFile()) result.push(disposeData(val,stats));
        });
    }
    finder(startPath);
    return result;
}

function disposeData(value,stats){
    let arr = [];
    arr[0] = value.slice(0,-4);
    arr[1] = SONG_NAME;
    arr[2] = Math.floor(stats.size/32000);
    return arr;
}

let fileNames=findSync('./newfiles');
fileNames.unshift(headerCont);
// console.log(fileNames);

fs.writeFile(`./${SONG_NAME}.txt`,JSON.stringify(fileNames),function(err){
    if (err) throw err;
    console.log('文件已被保存');
})