// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('sql', {
  tableCreate: () => ipcRenderer.invoke('tableCreate'),
  insertTodo: () => ipcRenderer.invoke('insertTodo'),
  selectTodos: () => ipcRenderer.invoke('selectTodos')
});