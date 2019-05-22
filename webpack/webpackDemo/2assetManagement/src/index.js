import _ from "lodash";
import './style.css';
import myIcon from './icon.jpg';
import data from './data.xml';

function component() {
    var element = document.createElement('div');

    // lodash (目前通过一个 script 脚本引入) 对于执行这一行是必须的
    element.innerHTML = _.join(["Hello",'Webpack1'],' ');

    element.classList.add('hello');

    var img = new Image();
    img.src = myIcon;

    element.appendChild(img);

    console.log(data);

    return element;
}

document.body.appendChild(component());