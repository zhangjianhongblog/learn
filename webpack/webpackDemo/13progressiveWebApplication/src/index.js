import _ from "lodash";
import printMe from './print.js';


if ('serviceWorker' in navigator) {
    window.addEventListener('load',() =>{ 
        navigator.serviceWorker.register('service-worker.js').then(registration => {
            console.log('SW registered: ',registration);
        }).catch(registrationError => {
            console.log('SW registeration failed: ',registrationError);
        })
    })
}


function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');

    // lodash (目前通过一个 script 脚本引入) 对于执行这一行是必须的
    element.innerHTML = _.join(["Hello",'Webpack1'],' ');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;
    
    element.appendChild(btn);

    return element;
}

document.body.appendChild(component());