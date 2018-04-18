import { app, BrowserWindow, screen,remote,ipcRenderer,Menu,Tray,ipcMain  } from 'electron';
import * as path from 'path';
import * as url from 'url';

// cross-env ENV=rod npm run electron:windows
// import { autoUpdater } from "electron-updater";

let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');
let tray=null;
const iconPath = path.join(__dirname, './favicon.png');
 
const contextMenu = Menu.buildFromTemplate([
  {label: 'System info', type: 'radio', 
  click(){
  //  win.loadURL(`file://${__dirname}/index.html/box`);
  }
}
,{ label: 'FeedBack', type: 'radio', 

  click () { 
    require('electron').shell.openExternal('http://localhost:4200/feedback') 
    }
},
  {label: 'Exit', type: 'radio', 
  click(){
      app.quit();
  }
}

  // {label: 'Item2', type: 'radio'},
  // {label: 'Item3', type: 'radio', checked: true},
  // {label: 'Item4', type: 'radio'}
])



// const server = 'https://hazel-server-xkyowwynpr.now.sh';
// const feed = `${server}/update/${process.platform}/${app.getVersion()}`

// autoUpdater.setFeedURL(feed);
// const {autoUpdater} = require("electron-updater");
// autoUpdater.loautoUpdater.logger = require("electron-log")
// autoUpdater.logger.transports.file.level = "info"
// autoUpdater.checkForUpdatesAndNotify();

// function sendStatusToWindow(text) {
//   // log.info(text);
//   console.log(text);
//   win.webContents.send('message', text);
// }
// autoUpdater.on('checking-for-update', () => {
//   sendStatusToWindow('Checking for update...');
// })
// autoUpdater.on('update-available', (info) => {
//   console.log(info);
//   sendStatusToWindow('Update available.');
// })
// autoUpdater.on('update-not-available', (info) => {
//   console.log(info);
//   sendStatusToWindow('Update not available.');
// })
// autoUpdater.on('error', (err) => {
//   console.log(err);
//   sendStatusToWindow('Error in auto-updater. ' + err);
// })
// autoUpdater.on('download-progress', (progressObj) => {
//   console.log(progressObj.bytesPerSecond);
//   let log_message = "Download speed: " + progressObj.bytesPerSecond;
//   log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
//   log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
//   sendStatusToWindow(log_message);
// })
// autoUpdater.on('update-downloaded', (info) => {
//   console.log(info);
//   sendStatusToWindow('Update downloaded');
// });

// autoUpdater.on('update-available', function() {  
//   console.log('update available');
// });
try {
  require('dotenv').config();
} catch {
  console.log('asar');
}

function createWindow() {
  tray = new Tray(iconPath)
  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    frame: false,
    width: 1200,
    height:750,
    icon:iconPath   
  });

  if (serve) {
    require('electron-reload')(__dirname, {
     electron: require(`${__dirname}/node_modules/electron`)});
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  ipcMain.on('windowSetting',(winSet)=>{
    
    console.log(winSet);
    })
  tray.setToolTip('Flipper');
  
  tray.setContextMenu(contextMenu)

  //win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
