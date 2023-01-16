interface MySqlAPI {
  tableCreate: () => void
  insertTodo: (todo: string, date: string) => void
  selectTodos: () => Todo[]
  check_dirname: () => string
  checkNodeEnv: () => string
  isFileSizeGreaterThanZero: (filePath: string) => boolean
  deleteTodo: (id: number) => void
  updateContent: (id: number, newContent: string, column: string) => void
  updateDueDate: (id: number, newDueDate: string, column: string) => void
  selectNotification: () => MyNotification
  updateNotification: (interval: number) => void
  updateDoNoticeInTodo: (id: number) => void
}

interface Window {
  sql: MySqlAPI
}

declare var window: Window & typeof globalThis

interface Todo {
  id: number
  content: string
  due_date: string
  do_notice: number
}

interface MyNotification {
  interval: number
}