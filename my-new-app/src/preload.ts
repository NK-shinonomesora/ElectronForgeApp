// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('sql', {
  tableCreate: () => ipcRenderer.invoke('tableCreate'),
  insertTodo: (todo: string, date: string) => ipcRenderer.invoke('insertTodo', todo, date),
  selectTodos: () => ipcRenderer.invoke('selectTodos')
});