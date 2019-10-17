export default {
    name:'Functional-button',
    // 函数式组价：
    functional:true,
    render(createElement,{data,children}) {
        // console.log(context);
        return createElement('button',data,['hello',...children]);
    }
}