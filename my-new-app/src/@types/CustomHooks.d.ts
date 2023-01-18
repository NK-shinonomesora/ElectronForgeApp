interface MyCustomHook {
  count: number;
  Increment: () => void;
}

interface ContentHook {
  content: string
  SetContent: (value: string) => void
}

interface DueDateHook {
  dueDate: string
  SetDueDate: (value: string) => void
}

interface ModalWindowHook {
  modalIsOpen: boolean
  openModal: () => void
  closeModal: () => void
}

interface DeleteHook {
  todos: Todo[]
  setTodos: (todos: Todo[]) => void
}

interface TodoHook {
  todos: Todo[]
  setTodos: (todos: Todo[]) => void
  content: string
  isChangedContent: boolean
  dueDate: string
  isChangedDueDate: boolean
  SetContent: (content: string) => void
  SetDueDate: (date: string) => void
  SetIsChangedContent: (flag: boolean) => void
  SetIsChangedDueDate: (flag: boolean) => void
  UpdateContent: (id: number) => void
  UpdateDueDate: (id: number) => void
  SortTodosByDueDate: (todos: Todo[]) => void
  UpdateDoNoticeInTodo: (id: number) => void
  CompleteTodo: (id: number) => void
  DeleteTodo: (id: number) => void
}

interface NotificationIntervalHook {
  viewInterval: number
  SetInterval: (newInterval: string) => void
  UpdateNotification: () => void
  setInterval: (interval: number) => void
  setViewInterval: (interval: number) => void
}

interface CompleteHook {
  completes: Complete[]
  setCompletes: (completes: Completes[]) => void
  DeleteComplete: (id: number) => void
}