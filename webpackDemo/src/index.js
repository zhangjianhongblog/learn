import _ from 'lodash';
import printMe from './print.js';

function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');

    element.innerHTML = _.join(['Hello','World'],' ');
    btn.innerHTML = 'Clc'
    return element;
}

document.body.appendChild(component());