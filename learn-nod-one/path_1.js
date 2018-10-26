const path = require('path');
const process = require('process');

// console.log(path.basename('c:\\index.html','.html'));
// console.log(path.basename('c://index.html'));

// console.log(path.win32.basename('c:\\index.html'));
// console.log(path.win32.basename('c:\\index.html','.html'));

// console.log(process.env);

// console.log(path.delimiter);

// console.log(process.env.PATH);
// console.log(process.env.path.split(path.delimiter));

// console.log(path.dirname('/bar/foo/baz/bar/foo/baz/index.html'));

// console.log(path.extname('index.html'));
// console.log(path.extname('index.html.ext'));
// console.log(path.extname('index.'));
// console.log(path.extname('.index'));
// console.log(path.extname('index'));

// console.log(path.format({
//     dir:"/home/user/dir",
//     root:'/ignored',
//     base:'file.txt',
// }));

// console.log(path.format({
//     root:'/',
//     base:'file.txt',
//     ext:'ignored',
// }));

// console.log(path.format({
//     root:'/',
//     name:'file',
//     ext:'.txt',
// }));

// console.log(path.format({
//     dir:"c:\\path\\dir",
//     base:'file.txt',
// }))

// console.log(path.isAbsolute('//server'));
// console.log(path.isAbsolute('\\\\server'));
// console.log(path.isAbsolute('c:/foo/..'));
// console.log(path.isAbsolute('c:\\foo\\..'));
// console.log(path.isAbsolute('bar\\baz'));
// console.log(path.isAbsolute('bar/baz'));
// console.log(path.isAbsolute(''));
// console.log(path.isAbsolute('.'));

// console.log(path.join('/foo','/bar','baz/asdf','index','..'));
// console.log(path.join('/foo','/bar','baz/asdf','index.html'));
// console.log(path.join(''));
// console.log(path.join('index',{},'bar'));

// console.log(path.normalize('c:\\temp\\\\foo\\bar\\..\\'));
// console.log(path.normalize('c:\\temp\\\\foo\\bar\\..\\index.html'));
// console.log(path.normalize('c:////temp\\\\/\\/\\/foo/bar'));
// console.log(path.win32.normalize('c:////temp\\\\/\\/\\/foo/bar'));

// console.log(path.parse('/home/user/dir/file.txt'));
// console.log(path.parse('c:\\path\\dir\\file.txt'));

// console.log(path.relative('c:\\orandea\\test\\aaa','c:\\orandea\\impl\\bbb'));

// console.log(path.resolve('/foo/bar','./baz'));
// console.log(path.resolve('/foo/bar','/tmp/file/'));
// console.log(path.resolve('/foo/bar','/tmp/file'));
// console.log(path.resolve('/wwwroot','static_files/png','../gif/image.gif'));
// console.log(path.resolve());
// console.log(path.resolve('foo/bar','./img.png'));
// console.log(path.resolve('foo/bar','./images//img.png'));

// console.log(path.sep);

// console.log('/bar/foo/baz'.split(path.sep));
// console.log('bar\\foo\\baz'.split(path.sep));

// console.log(path.basename('/foo/bar/baz/asdf/quux.html'))
// console.log(path.basename('/foo/bar/baz/asdf/quux.html', '.html'))
console.log(path.isAbsolute(''));
console.log(path.isAbsolute());