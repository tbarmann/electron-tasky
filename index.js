const electron = require('electron');
const path = require('path');
const {app, BrowserWindow, Tray} = electron;
const TimerTray = require('./app/TimerTray');

let mainWindow;

const isWindows = process.platform === 'win32';
const isMacOS = process.platform === 'darwin';

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    height: 500,
    width: 300,
    frame: false,
    resizable: false,
    show: false
  });
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);

  const iconName = isWindows ?  'windows-icon.png' : 'iconTemplate.png';
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`)
  const tray = new TimerTray(iconPath, mainWindow);
});