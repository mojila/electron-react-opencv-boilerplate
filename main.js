const { app, BrowserWindow } = require('electron');

let win;

const DEVELOPMENT = true;

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