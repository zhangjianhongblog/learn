import Vue from 'vue';

/**
 * 首字母大写
 * @param {String} str 字符串
 * @example heheHaha
 * @return {String} HeheHaha 
 */
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


/**
 * 对符合 'xx/xx.vue' 组件格式的组件取组件名
 * @param {String} str filename
 * @example abc/bcd/def/basicTable.vue
 * @return {String} BasicTable
 */
function validateFileName(str) {
    return /^\S+\.vue$/.test(str) && str.replace(/^\S+\/(\w+)\.vue$/, (rs, $1) => capitalizeFirstLetter($1));
}

const requireComponent = require.context('./',true,/\.vue$/);

// 找到组件文件夹一下以 .vue 命名的文件，如果文件名为index，那么取组件中的name作为注册的组件名
requireComponent.keys().forEach(filePath => {
    const componentConfig = requireComponent(filePath);
    const filename = validateFileName(filePath);
    const componentName = filename.toLowerCase() === 'index' 
        ? capitalizeFirstLetter(componentConfig.default.name)
        : filename;
    Vue.component(componentName,componentConfig.default || componentConfig)
})