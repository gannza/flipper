
const {app,BrowserWindow,Menu,ipcMain,remote}= require('electron'); 
const electronTitlebarWindows = require('electron-titlebar-windows');
const path=require('path');
const url =require('url')
let win;
//process.env.NODE_ENV='production';
  /** Options */
//   let titlebar = new electronTitlebarWindows({
//     darkMode: true,
//     color: 'rgb(220, 200, 200)',
//     backgroundColor: 'rgb(200, 80, 150)',
//     draggable: true,
//     fullscreen: false
// });
// /**
//  * DOM
//  */
// titlebar.appendTo();
// /** Event#close */
// titlebar.on('close', () => {
//     console.info('close');
//     remote.getCurrentWindow().close();
// });
// /** Event#fullscreen */
// titlebar.on('fullscreen', () => {
//     console.info('fullscreen');
//     remote.getCurrentWindow().setFullScreen(true);
// });
// /** Event#minimize */
// titlebar.on('minimize', () => {
//     console.info('minimize');
//     remote.getCurrentWindow().minimize();
// });
// /** Event#maximize */
// titlebar.on('maximize', () => {
//     console.info('maximize');
//     remote.getCurrentWindow().setFullScreen(false);
//     remote.getCurrentWindow().maximize();
// });

function createwindow(){
    win=new BrowserWindow({
        width:1000,height:850,icon:__dirname+'/dist/assets/images/logo.png',
    });

    win.loadURL(url.format(
        {
           pathname:path.join(__dirname,'/dist/index.html'),
            protocol:'file:',
            slashes:true
        }
    ));
    //win.webContents.openDevTools();
    win.on('closed', ()=>{
        app.quit();
    });
}
// run ap by crewating window
    app.on('ready',function(){

        createwindow();
       // win.setMenu(null);
        const mainMenu=Menu.buildFromTemplate(menutemplate);
        Menu.setApplicationMenu(mainMenu);
    });

 
 
    //create menu template
    const menutemplate=[
        {
        
       label:'File',
       submenu:[
           {
               label:'Quit',
               accelerator:process.platform=='darwin' ? 'Command+Q':'Ctrl+Q',
               click(){
                   app.quit();
               }
           }
       ]
    }];
    // if on mac add empty object to menu
    if(process.platform=='darwin'){
        menutemplate.unshift({});
    }
    //add developer tools when not in production
    if(process.env.NODE_ENV!=='production'){
       menutemplate.push({
           label: 'Developer Tools',
           submenu:[
               {
                   label:'Toggle Dev tools',
                   accelerator:process.platform=='darwin' ? 'Command+I':'Ctrl+I',
                   click(item,focusedwin){
                    focusedwin.toggleDevTools();
                   }
               },{
                   role:'reload'
               }
           ]
       });
    }
   // quites when all windows are closed
   app.on('window-all-closed', () => {
       if(process.platform!=='darwin'){
         app.quit();
       }
   }
);
