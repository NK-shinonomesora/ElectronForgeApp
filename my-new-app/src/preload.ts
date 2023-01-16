const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('sql', {
  tableCreate: () => ipcRenderer.invoke('tableCreate'),
  insertTodo: (todo: string, date: string) => ipcRenderer.invoke('insertTodo', todo, date),
  selectTodos: () => ipcRenderer.invoke('selectTodos'),
  check_dirname: () => ipcRenderer.invoke('check_dirname'),
  checkNodeEnv: () => ipcRenderer.invoke('checkNodeEnv'),
  isFileSizeGreaterThanZero: () => ipcRenderer.invoke('isFileSizeGreaterThanZero'),
  deleteTodo: (id: number) => ipcRenderer.invoke('deleteTodo', id),
  updateContent: (id: number, newContent: string, column: string) => ipcRenderer.invoke('updateContent', id, newContent, column),
  updateDueDate: (id: number, newDueDate: string, column: string) => ipcRenderer.invoke('updateDueDate', id, newDueDate, column),
  selectNotification: () => ipcRenderer.invoke('selectNotification'),
  updateNotification: (interval: number) => ipcRenderer.invoke('updateNotification', interval),
  updateDoNoticeInTodo: (id: number) => ipcRenderer.invoke('updateDoNoticeInTodo', id),
});