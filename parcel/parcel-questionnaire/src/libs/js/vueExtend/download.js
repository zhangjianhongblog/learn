let downloadIFrame=null;
function createDownloadIFrame(){
    downloadIFrame=document.createElement("iframe");
    downloadIFrame.style.position="fixed";
    downloadIFrame.style.opacity="0";
    downloadIFrame.style.width="10px";
    downloadIFrame.style.height="10px";
    downloadIFrame.style.left="-20px";
    downloadIFrame.style.top="-20px";
    downloadIFrame.width="10";
    downloadIFrame.height="10";
    document.body.appendChild(downloadIFrame);
}
/**
 * @description: 下载文件
 */
function downloadFile(url){
    if(!downloadIFrame){
        createDownloadIFrame();
    }
    downloadIFrame.src=url?url:"";
}
/**
 * @description: form表单下载文件
 * @param {String} url 请求路径
 * @param {String} method 请求方式
 * @param {Object} params 请求参数
 */
function downloadFileByForm(url, method='GET', params={}) {
    let form = document.createElement('form');
    form.id = 'form';
    form.name = 'form';
    document.body.appendChild(form);
    for (let key in params) {
        if (params.hasOwnProperty(key)) {
            let input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = params[key];
            form.appendChild(input);
        }
    }
    form.method = method;
    form.action = url;
    form.submit();
    document.body.removeChild(form);
}
var install = {
    install(Vue) {
        Vue.mixin({
            beforeCreate() {
                this.$download = {
                    downloadFile: downloadFile,
                    downloadFileByForm: downloadFileByForm
                };
            }
        })
    }
}
export default install;