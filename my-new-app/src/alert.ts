import { EventEmitter } from 'node:events';
import { SelectTodos } from './database/db';
import { formatToTimeZone } from 'date-fns-timezone';
import { spawn } from 'node:child_process';

const GetCurrentDateNum = (): number => {
  const FORMAT = 'YYYY-MM-DD HH:mm:ss';
  const TIME_ZONE_TOKYO = 'Asia/Tokyo';
  const dateString = formatToTimeZone(new Date(), FORMAT, { timeZone: TIME_ZONE_TOKYO });
  const [a, b] = dateString.split(" ");
  return new Date(`${a}T${b}.125Z`).getTime();
}

const FilterExpiredTodos = (todos: Todo[]): Todo[] => {
  const currentDate = GetCurrentDateNum();
  const expiredTodos = todos.filter((todo: Todo, i: number) => {
    const dueDate = todo.due_date;
    return new Date(`${dueDate}T09:00:00.125Z`).getTime() < currentDate;
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
    await new Promise(resolve => { setTimeout(() => { resolve(0) }, 3000) })
  }
}

export async function Search() {
  const todos = await SelectTodos();
  const expiredTodos = FilterExpiredTodos(todos);
  Notice(expiredTodos);
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
