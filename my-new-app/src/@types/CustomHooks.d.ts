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