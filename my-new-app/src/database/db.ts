import * as sqlite3 from "sqlite3" 
import { join } from "path";
import { promisify } from "util"
import { readFile } from 'node:fs/promises';

const db = new sqlite3.Database(join(__dirname, '../../todo'));

const dbGet = promisify(db.get.bind(db));
const dbAll = promisify(db.all.bind(db));
const dbRun = function(arg: string) {
  return new Promise<any>((resolve, reject) => {
    db.run.apply(db, [
      arg,
      function(this: sqlite3.Database, err: Error) {
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

export const InsertTodo = async (event: Event, todo: string, date: string) => {
  try {
    await dbRun(`INSERT INTO todo (content, due_date) VALUES ("${todo}", "${date}")`);
  } catch(err) {
    throw new Error("Error ocurres in the InsertTodo");
  }
}

export const SelectTodos = () => {
  return dbAll(`SELECT * FROM todo`);
}

export const Check_dirname = () => {
  return join(__dirname, '../../');
}

export const CheckNodeEnv = () => {
  return process.env.NODE_ENV;
}

export const IsFileSizeGreaterThanZero = async (filePath: string) => {
  try {
    const file = await readFile(join(__dirname, filePath));
    return file.byteLength > 0 ? true : false;
  } catch(err) {
    console.log(err);
  }
}