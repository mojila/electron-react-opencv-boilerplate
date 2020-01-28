const { app, BrowserWindow, ipcMain } = require('electron');
const { EVENTS } = require('./src/consts/events');

let win;

const DEVELOPMENT = true;

function list_files(event, args) {
    console.log(args);
    win.webContents.send(EVENTS.RECEIVE_LIST_FILES, 'this is the list.');
}

function createWindow() {
    win = new BrowserWindow({
       width: 800,
       height: 600,
       webPreferences: {
           nodeIntegration: true
       }
    });

    if (DEVELOPMENT) {
        win.loadURL(`http://localhost:1234`);
    } else {
        win.loadFile(`${__dirname}/build/index.html`);
    }

    win.webContents.openDevTools();

    ipcMain.on(EVENTS.LIST_FILES, list_files);

    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
   if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
   if (win === null) createWindow();
});