import _ from "lodash";


function component() {
    var element = document.createElement('div');

    // lodash (目前通过一个 script 脚本引入) 对于执行这一行是必须的
    element.innerHTML = _.join(["Hello",'Webpack1'],' ');

    return element;
}

document.body.appendChild(component());