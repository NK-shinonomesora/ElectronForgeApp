import { InsertTodo, SelectTodos, DeleteTodo,IsFileSizeGreaterThanZero, UpdateTodo } from '../src/database/db';
import * as sqlite3 from "sqlite3" 
import { promisify } from 'util';
import { rm } from 'node:fs/promises'

const todo = { id: 1, content: "myTask", due_date: "2023-01-31" }
const e = new Event("");

describe("Database Operation", () => {

  beforeEach(async () => {
    const todos = await SelectTodos();
    await Promise.all(todos.map((todo) => DeleteTodo(e, todo.id)));
  });

  test('A todo is correctly created by the InsertTodo function.', async () => {
    const BeforeTodos = await SelectTodos();
    expect(BeforeTodos).toEqual([]);
    await InsertTodo(e, "myTask", "2023-01-31");
    const AfterTodos = await SelectTodos();
    expect(AfterTodos).toEqual([todo]);
  });

  test("The IsFileSizeGreaterThanZero functuin returns false only with no table.", async () => {
    const db = new sqlite3.Database('./todoForTest');
    let res = await IsFileSizeGreaterThanZero('../../todoForTest');
    expect(res).toBe(false);
    const dbRun = promisify(db.run.bind(db));
    await dbRun(
      `CREATE TABLE todo (
        id INTEGER PRIMARY KEY NOT NULL,
        content TEXT NOT NULL,
        due_date TEXT NOT NULL
      )`
    );
    res = await IsFileSizeGreaterThanZero('../../todoForTest');
    expect(res).toBe(true);
    await rm('todoForTest');
  });

  test("A todo is correctly updated by the UpdateTodo function,", async () => {
    await InsertTodo(e, "myTask", "2023-01-31");
    await UpdateTodo(e, 1, "myTask2", "content");
    let updateTodo = await SelectTodos();
    expect(updateTodo).toEqual([{ id: 1, content: "myTask2", due_date: "2023-01-31" }]);
    await UpdateTodo(e, 1, "2023-02-28", "due_date");
    updateTodo = await SelectTodos();
    expect(updateTodo).toEqual([{ id: 1, content: "myTask2", due_date: "2023-02-28" }]);
  });
});

