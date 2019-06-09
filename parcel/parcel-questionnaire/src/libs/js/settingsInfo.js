const settings = require('electron-settings');// 设置版本号
const version = require("@public/version/global.js");

// 系统名（questionaire） + 环境
let settingsInfo = `questionaire.${version.versionType}`

/**
 * 对象里面是否有这个属性
 * @param {String} obj 
 * @param {String} key 属性
 * @return {Boolean} 
 */
function hasKey(obj,key) {
    return settings.has(`${settingsInfo}.${obj}.${key}`);
}

/**
 * 对象里面获取这个属性的值
 * @param {String} obj 
 * @param {String} key 属性
 */
function getVal(obj,key) {
    return settings.get(`${settingsInfo}.${obj}.${key}`)
}

/**
 * 设置对象里面的属性的值
 * @param {String} obj 
 * @param {String} key 属性
 * @param {String} val 值
 */
function setVal(obj,key,val) {
    settings.set(`${settingsInfo}.${obj}.${key}`,val)
}

module.exports = {
    hasKey,
    getVal,
    setVal
}