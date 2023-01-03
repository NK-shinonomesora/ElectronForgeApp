interface MySqlAPI {
  tableCreate: () => void
  insertTodo: (todo: string, date: string) => void
  selectTodos: () => Todo[]
  check_dirname: () => string
  checkNodeEnv: () => string
  isFileSizeGreaterThanZero: (filePath: string) => boolean
  deleteTodo: (id: number) => void
}

interface Window {
  sql: MySqlAPI
}

declare var window: Window & typeof globalThis

interface Todo {
  id: number
  content: string
  due_date: string
}