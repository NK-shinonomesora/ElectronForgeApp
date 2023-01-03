const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('sql', {
  tableCreate: () => ipcRenderer.invoke('tableCreate'),
  insertTodo: (todo: string, date: string) => ipcRenderer.invoke('insertTodo', todo, date),
  selectTodos: () => ipcRenderer.invoke('selectTodos'),
  check_dirname: () => ipcRenderer.invoke('check_dirname'),
  checkNodeEnv: () => ipcRenderer.invoke('checkNodeEnv'),
  isFileSizeGreaterThanZero: () => ipcRenderer.invoke('isFileSizeGreaterThanZero'),
  deleteTodo: (id: number) => ipcRenderer.invoke('deleteTodo', id),
});