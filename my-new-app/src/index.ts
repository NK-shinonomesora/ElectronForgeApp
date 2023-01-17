import { app, BrowserWindow, ipcMain } from 'electron';
import { TableCreate, InsertTodo, SelectTodos, Check_dirname, CheckNodeEnv, IsFileSizeGreaterThanZero, DeleteTodo, UpdateTodo, SelectInterval, UpdateNotification, UpdateDoNoticeInTodo, SelectTodo, InsertComplete, SelectCompletes, DeleteComplete } from './database/db';
import { Search, AlertEventEmitter } from './alert';
// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });
  ipcMain.handle('tableCreate', () => TableCreate());
  ipcMain.handle('insertTodo', InsertTodo);
  ipcMain.handle('selectTodos', () => SelectTodos());
  ipcMain.handle('selectTodo', SelectTodo);
  ipcMain.handle('check_dirname', () => Check_dirname());
  ipcMain.handle('checkNodeEnv', () => CheckNodeEnv());
  ipcMain.handle('isFileSizeGreaterThanZero', () => IsFileSizeGreaterThanZero("../../todo"));
  ipcMain.handle('deleteTodo', DeleteTodo);
  ipcMain.handle('updateContent', UpdateTodo);
  ipcMain.handle('updateDueDate', UpdateTodo);
  ipcMain.handle('selectNotification', () => SelectInterval());
  ipcMain.handle('updateNotification', UpdateNotification);
  ipcMain.handle('updateDoNoticeInTodo', UpdateDoNoticeInTodo);
  ipcMain.handle('insertComplete', InsertComplete);
  ipcMain.handle('selectCompletes', () => SelectCompletes());
  ipcMain.handle('deleteComplete', DeleteComplete);
  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

const alertEventEmitter = new AlertEventEmitter();
alertEventEmitter.on('search', Search).searchShouldDo();
