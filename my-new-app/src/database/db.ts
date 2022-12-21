import { sqlite3 } from "sqlite3";

const { join } = require('path');
const { promisify } = require('util');

const sqlite3: sqlite3 = process.env.NODE_ENV === 'production' ? require('sqlite3') : require('sqlite3').verbose();
const db = new sqlite3.Database('./todo');

const dbGet = promisify(db.get.bind(db));
const dbAll = promisify(db.all.bind(db));
const dbRun = function(arg: string) {
  return new Promise<any>((resolve, reject) => {
    db.run.apply(db, [
      arg,
      function(this: sqlite3["Database"], err: Error) {
        err ? reject(err) : resolve(this)
      }
    ]
    )
  })
}

export const TableCreate = () => {
  dbRun(`CREATE TABLE todo (
    id INTEGER PRIMARY KEY NOT NULL,
    content TEXT NOT NULL,
    due_date TEXT NOT NULL
  )`);
}

export const InsertTodo = () => {
  dbRun(`INSERT INTO todo (content, due_date) VALUES ("AWS Reply", "2022/12/22")`);
}

export const SelectTodos = () => {
  return dbAll(`SELECT * FROM todo`);
}