const fs = require('fs');
const xlsx = require('node-xlsx');

const allData = xlsx.parse(`${__dirname}/数据/国歌.xlsx`);
const allData2019 = xlsx.parse(`${__dirname}/数据/2019国测项目.xlsx`);
const scoreArr = allData[0].data;
const statisticsArr = allData[1].data; // 统计数据
const infoArr = allData2019[0].data; // 用户信息

scoreArr.shift(); // 删除第一项
infoArr.shift(); // 删除第一项
const finalHeader = ['项目名称','省编码','省名称','区县编码','区县名称','学校编码','学校名称','学校类型','学生ID','学生编码','考场','生日','年级','性别','综合','表现','流畅性','音准','节奏','歌词']

// 把性别加到数据excel中
const finalData = [];
scoreArr.forEach(item => {
    let id = item[0];
    let arr = [];
    for (let i = 0; i < infoArr.length; i++) {
        let tempArr = infoArr[i];
        // if (tempArr.includes(id)) {
        if (tempArr.includes(id) && tempArr[13] !== 1) { // 仅仅统计女生
            tempArr[1] += ''; // 省编码
            tempArr[3] += ''; // 区县编码
            tempArr[5] += ''; // 学校编码
            tempArr[9] += ''; // 学生编码
            tempArr[10] += ''; // 考场
            // tempArr[11] += ''; // 生日
            tempArr[13] = tempArr[13] === 1 ? '男' : '女'; // 性别
            arr = [].concat(tempArr,item.slice(1));
            finalData.push(arr);
            break;
        }
    }
})

// 把标题加到最前面
finalData.unshift(finalHeader);

const newExcel = [
    {
        name:'sheet1',
        data: finalData
    },
    {
        name:'sheet2',
        data:statisticsArr
    }
];
// 写xlsx
var buffer = xlsx.build(newExcel);
fs.writeFile('./resut.xlsx', buffer, (err) => {
    if (err) throw err;
    console.log('已经成功生成excel');
});