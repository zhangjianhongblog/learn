const fs = require('fs');

// let allVideoData = JSON.parse(String(fs.readFileSync('./allVideo.json')));
let allVideoData = JSON.parse(fs.readFileSync('./allVideo.json',{
    encoding:'utf-8'
}));
console.log(Array.isArray(allVideoData));

let finallyData = [];

allVideoData.forEach(item => {
    let tempObj = {};

    // 辅助资料,以json形式存储
    tempObj.auxiliary = '';

    // 年级 1七年级2八年级3九年级
    let gradeObj = {
        '08': 1,
        '09': 2,
        '10': 3
    }
    tempObj.grade = gradeObj[item.nj];

    // 年级名称
    let gradeNameObj = {
        '08': '七年级',
        '09': '八年级',
        '10': '九年级'
    }
    // 册次
    let bookTimesObj = {
        '01':'上册',
        '02':'下册'
    }
    // 章节Id
    tempObj.chapterSectionId = `${gradeNameObj[item.nj]}${bookTimesObj[item.cb]},${item.fzjmlmc},${item.zjmlmc},${item.ks}`;

    // 章节路径 ,隔开
    tempObj.chapterSectionPath = tempObj.chapterSectionId;

    // 归属栏目 字典type=10010
    tempObj.classification = '';

    // 封面路径Id
    tempObj.coverPath = item.sptp;

    // 是否是精品 0--不是精品，1--精品
    tempObj.elaborate = 0;

    // 讲师
    tempObj.lecturer = item.zjjs;

    // 知识点id集合
    tempObj.pointIds = [];

    // 资源介绍
    tempObj.resourceIntroduce = '';

    // 视频名称
    tempObj.resourceName = item.spmc;

    // 资源路径对应Id
    tempObj.resourcePath = item.spid;

    // 资源大小
    tempObj.resourceSize = '';

    // 资源状态 -1已删除；0未上架；2已上架
    tempObj.resourceState = 0;

    // 风格 1--重在探究；2--重在讲授
    if (item.spfg === '01') {
        tempObj.resourceStyle = 2;
    } else if (item.spfg === '02') {
        tempObj.resourceStyle = 1;
    } else {
        tempObj.resourceStyle = 0;  
    }

    // 	资源类型1--视频；2--文件
    tempObj.resourceType = 1;

    // 应用场景 课前预习和课后复习
    if (item.splx === '01') { // 课前预习
        tempObj.scene = 1;
    } else if (item.splx === '02') {// 课后复习
        tempObj.scene = 2;
    } else {
        tempObj.scene = 0;
    }

    // 作者
    tempObj.author = item.creatername;

    // 视频url
    tempObj.url = item.url.split('/').pop();
    
    finallyData.push(tempObj);
})
// console.log(finallyData);

fs.writeFile('./backEnd.json',JSON.stringify(finallyData),'utf8',function (err) {
    if (err) throw err;
    console.log('文件写入完成');
})