const {
    app,
    BrowserWindow,
    ipcMain
} = require('electron');

const shortCut = require('./libs/shortcutKeys.js'); 
const path = require('path');

let onlineStatusWindow;

app.setUserTasks([
    {
        program:process.execPath,
        arguments:'--new-window',
        iconPath:process.execPath,
        iconIndex:0,
        title:'New Window',
        description:'Create a new window'
    }
])
app.on('ready',() => {
    shortCut.register();
    onlineStatusWindow = new BrowserWindow({
        webPreferences:{
            nodeIntegration:true
        }
    });
    // onlineStatusWindow.loadURL(`file://${__dirname}/../online-status.html`);    
    onlineStatusWindow.loadFile(`online-status.html`);
    onlineStatusWindow.once('focus', () => onlineStatusWindow.flashFrame(false))
    onlineStatusWindow.flashFrame(true)
})

ipcMain.on('online-status-change',(event,status) => {
    console.log(status);
})