import _ from 'lodash';

function component() {
    var element = document.createElement('div');
    var button = document.createElement('button');
    var br = document.createElement('br');

    button.innerHTML = 'Click me and look at the console';
    element.innerHTML = _.join(['Hello','Webpack'],' ');
    element.appendChild(br);
    element.appendChild(button);

    // Note that beacuse a network request is involved,some indication of loading would need to be shown in a productio-level site/app. 
    button.onclick = e => import(/* webpackChunkName:'print' */ './print').then(module => {
        var print = module.default;

        print();
    })

    return element;
}

document.body.appendChild(component());