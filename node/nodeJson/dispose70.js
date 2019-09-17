const fs = require('fs');
const join = require('path').join;
const xlsx = require('node-xlsx');

// /**
//  * 
//  * @param startPath  起始目录文件夹路径
//  * @returns {Array}
//  */
// function findSync(startPath) {
//     let result=[];
//     function finder(path) {
//         let files=fs.readdirSync(path);
//         files.forEach((val) => {
//             let fPath=join(path,val);
//             let stats=fs.statSync(fPath);
//             if(stats.isDirectory()) {
//                 finder(fPath)
//             };
//             if(stats.isFile()) result.push(fPath);
//         });
//     }
//     finder(startPath);
//     return result;
// }

// let fileNames=findSync('./数据');

// const excelData = [];
// const excelDataHeader = ['项目名称','省份','演唱文件名','学生编码','性别','歌曲名称'];

// // 学生ID + 歌曲名称
// fileNames.forEach(item => {
//     let tempArr = item.split(/\\/);
//     let arr = [];
//     let tempId = tempArr[tempArr.length -1].split('.')[0];
//     let songName = tempArr[tempArr.length -2]
//     arr.push(tempId,songName);
//     excelData.push(arr);
// })

// const data2019 = xlsx.parse(`${__dirname}/myExcel/国歌.xlsx`);
// const info2019Arr = data2019[0].data;

// const finalData = [];
// excelData.forEach(item => {
//     let arr = [];
//     let tempId = item[0]; // 学生id
//     let songName = item[item.length - 1]; // 歌曲名称
//     for (let i = 0; i < info2019Arr.length; i++) {
//         let tempArr = info2019Arr[i];
//         if (tempArr.includes(tempId)) {
//             let projectName = tempArr[0]; // 项目名称
//             let provinceName = tempArr[2]; // 省名称
//             let stuCode = tempArr[tempArr.length - 5] + ''; // 学生编码
//             let sex = tempArr[tempArr.length - 1] === 1 ? '男' : '女';
//             arr.push(projectName,provinceName,tempId,stuCode,sex,songName);
//             break;
//         }
//     }
//     finalData.push(arr);
// })

// finalData.unshift(excelDataHeader);
// // 写xlsx
// var buffer = xlsx.build([
//     {
//         name:'sheet1',
//         data:finalData
//     }
// ]);
// fs.writeFile('./resut.xlsx', buffer, (err) => {
//     if (err) throw err;
//     console.log('已经成功生成excel');
// });


const data2019 = xlsx.parse(`${__dirname}/myExcel/国歌.xlsx`);
const info2019Arr = data2019[0].data;

const songNames = ['歌唱祖国', '我和你', '大海啊故乡', '我的中国心', '青春舞曲','我们的田野','欢乐颂','友谊地久天长',"雪绒花",'少年先锋队队歌',
"小螺号","卖报歌","让我们荡起双桨","嘀哩嘀哩","小小少年","小白船"]
const finallyData = [];

function getNumber(){
    return Math.floor(Math.random() * 16);
}

info2019Arr.forEach(item => {
    let tempObj = {
        "id":item[3],
        "province":item[0],
        "country":item[1],
        "school":item[2],
        "comprehensive":item[4],
        "performance":item[5],
        "fluency":item[6],
        "intonation":item[7],
        "rhythm":item[8],
        "Lyric":item[9],
        "curStatus":"waiting"
    }
    let myNumber = getNumber();
    if (myNumber === 16) {
        console.log('出错了')
        myNumber = 1;
    }
    tempObj.songName = songNames[myNumber];
    finallyData.push(tempObj);
})
// console.log(finallyData);
fs.writeFile('./myjson.js',JSON.stringify(finallyData),'utf8',function(err,data){
    console.log('写完了')
})