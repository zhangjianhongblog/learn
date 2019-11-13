console.log(1);
new Promise((res,rej) =>{
    console.log(1111);
    res();
}).then(() => {
    console.log(2222);
})
setTimeout(() => {
    console.log(2)
}, 10);
console.log(3);
for (let i=0; i < 99999; i++) {}

console.log(4);

// 1 1111 3 4 2222 2