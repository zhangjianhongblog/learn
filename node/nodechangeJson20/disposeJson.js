const fs = require('fs');
const xlsx = require('node-xlsx');

const allData = xlsx.parse(`${__dirname}/数据/20条数据.xlsx`);
const scoreArr = allData[0].data;

console.log(scoreArr);

// const newExcel = [
//     {
//         name:'sheet1',
//         data: finalData
//     },
//     {
//         name:'sheet2',
//         data:statisticsArr
//     }
// ];
// // 写xlsx
// var buffer = xlsx.build(newExcel);
// fs.writeFile('./resut.xlsx', buffer, (err) => {
//     if (err) throw err;
//     console.log('已经成功生成excel');
// });