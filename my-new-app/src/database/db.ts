import * as sqlite3 from "sqlite3" 
import { join } from "path";
import { promisify } from "util"
import { readFile } from 'node:fs/promises';
import { GetCurrentDateString } from "../alert";

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

export const TableCreate = async () => {
  await dbRun(`CREATE TABLE todo (
    id INTEGER PRIMARY KEY NOT NULL,
    content TEXT NOT NULL,
    due_date TEXT NOT NULL,
    do_notice INTEGER NOT NULL
  )`);
  await dbRun(`CREATE TABLE notification (
    interval INTEGER
  )`);
  await dbRun(`INSERT INTO notification (interval) VALUES (1)`);
  await dbRun(`CREATE TABLE complete (
    id INTEGER PRIMARY KEY NOT NULL,
    content TEXT NOT NULL,
    date TEXT NOT NULL
  )`);
}

export const InsertTodo = async (event: Event, todo: string, date: string) => {
  try {
    await dbRun(`INSERT INTO todo (content, due_date, do_notice) VALUES ("${todo}", "${date}", 0)`);
  } catch(err) {
    throw new Error("Error ocurres in the InsertTodo");
  }
}

export const SelectTodos = () => {
  return dbAll(`SELECT * FROM todo`);
}

export const SelectTodo = async (event: Event, id: number) => {
  return await dbGet(`SELECT content FROM todo where id = ${id}`);
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

export const DeleteTodo = async (event: Event, id: number) => {
  try {
    await dbRun(`delete from todo where id = ${id}`);
  } catch(err) {
    console.log(err);
  }
}

export const UpdateTodo = async (event: Event, id: number, newData: string, column: string) => {
  try {
    await dbRun(`UPDATE todo SET "${column}" = "${newData}" WHERE id = ${id}`);
  } catch(err) {
    console.log(err);
  }
}

export const UpdateDoNoticeInTodo = async (event: Event, id: number) => {
  try {
    await dbRun(`UPDATE todo SET do_notice = (do_notice + 1) % 2 WHERE id = ${id}`);
  } catch(err) {
    console.log(err);
  }
}

export const SelectInterval = async () => {
 return await dbGet('SELECT interval FROM notification');
}

export const UpdateNotification = async (event: Event, interval: number) => {
  try {
    await dbRun(`UPDATE notification SET interval = ${interval}`);
  } catch(err) {
    console.log(err);
  }
}

export const SelectCompletes = () => {
  return dbAll(`SELECT * FROM complete`);
}

export const InsertComplete = async (event: Event, content: string) => {
  try {
    const date = GetCurrentDateString();
    await dbRun(`INSERT INTO complete (content, date) VALUES ("${content}", "${date}")`);
  } catch(err) {
    throw new Error("Error ocurres in the InsertComplete");
  }
}

export const DeleteComplete = async (event: Event, id: number) => {
  try {
    await dbRun(`delete from complete where id = ${id}`);
  } catch(err) {
    console.log(err);
  }
}