import {cube} from "./main.js";


if (process.env.NODE_ENV === 'production') {
    console.log("我是在生产环境");
} else {
    console.log('我是在开发环境');
}
function component() {
    var element = document.createElement('pre');

    element.innerHTML = [
        'Hello Webpack!',
        '5 cubed is equal to ' + cube(5)
    ].join('\n\n');

    return element;
}

document.body.appendChild(component());