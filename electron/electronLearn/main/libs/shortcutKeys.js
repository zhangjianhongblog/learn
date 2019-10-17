// 键盘快捷键

const {
    app,
    BrowserWindow,
    globalShortcut
} = require('electron');

class Shortcut {
    register(keys="Command+Control+Alt+F5") {
        globalShortcut.register(keys,function() {
            let allWindow = BrowserWindow.getAllWindows();
            for (let index =0; index < allWindow.length; index++) {
                let win = allWindow[index];
                if (win.webContents && !win.webContents.isDevToolsFocused()) {
                    win.webContents.openDevTools({
                        mode:'detach'
                    })
                }
            }
        })
    }
}

app.on('will-quit',function () {
    globalShortcut.unregisterAll();
})

module.exports = new Shortcut();