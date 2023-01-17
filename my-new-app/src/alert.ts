import { EventEmitter } from 'node:events';
import { SelectInterval, SelectTodos, IsFileSizeGreaterThanZero, TableCreate  } from './database/db';
import { formatToTimeZone } from 'date-fns-timezone';
import { spawn } from 'node:child_process';

export const GetCurrentDateString = (): string => {
  const FORMAT = 'YYYY-MM-DD HH:mm:ss';
  const TIME_ZONE_TOKYO = 'Asia/Tokyo';
  return formatToTimeZone(new Date(), FORMAT, { timeZone: TIME_ZONE_TOKYO });
}

const GetCurrentDateNum = (): number => {
  const dateString = GetCurrentDateString();
  const [a, b] = dateString.split(" ");
  return new Date(`${a}T${b}.125Z`).getTime();
}

const FilterExpiredTodos = (todos: Todo[], interval: number): Todo[] => {
  const currentDate = GetCurrentDateNum();
  const expiredTodos = todos.filter((todo: Todo, i: number) => {
    const [a, b] = todo.due_date.split(" ");
    return (todo.do_notice === 0) && (new Date(`${a}T${b}:00.125Z`).getTime() < currentDate + interval * 60 * 1000);
  });
  return expiredTodos;
}

const Notice = async (todos: Todo[]) => {
  for(let i = 0; i < todos.length; i++) {
    const display = spawn('osascript', ['-e', `display notification "${todos[i].content}" with title "Expired!!!"`]);
    // ls.stdout.on('data', (data) => {
    //   console.log(`stdout: ${todos}`);
    // });
    display.stderr.on('data', (data) => {
      console.error(`stderr: ${ data }`);
    });
    display.on('close', (code) => {
      console.log(`child process exited with code ${ code }`);
    });
    await new Promise(resolve => { setTimeout(() => { resolve(0) }, 5000) });
  }
}

export async function Search() {
  if(!(await IsFileSizeGreaterThanZero("../../todo"))) {
    await TableCreate();
  }
  setInterval(async () => {
    const res = await SelectInterval();
    const todos = await SelectTodos();
    const expiredTodos = FilterExpiredTodos(todos, res.interval);
    await Notice(expiredTodos);
}, 60000);
}

// export function EndLisner() {
//   console.log("end");
//   this
//   .off('start', StartLisner)
//   .off('end', EndLisner);
// }

export class AlertEventEmitter extends EventEmitter {
  async searchShouldDo() {
    this.emit('search');
  }
}
