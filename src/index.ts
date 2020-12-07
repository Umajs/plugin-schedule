import { Uma, TPlugin } from "@umajs/core";
import { scheduleMap } from "./schedule"
import { IScheduleInfo } from "./schedule/interface";
import { AbstractSchedule } from './schedule'
type taskConfig = {
  auto: boolean;
  task: any
  options: IScheduleInfo
  mark: string
}


export default (uma: Uma): TPlugin => {

  const config = uma.config

  const taskConfig: taskConfig[] = config.schedule

  for (let i = 0; i < taskConfig.length; i++) {

    let { auto, task, options, mark } = taskConfig[i]

    if(!mark) throw new Error(' task must have mark')

    let initTask: AbstractSchedule = new task(options);

    Reflect.set(scheduleMap, mark, initTask)

    if (auto) {

      Reflect.get(scheduleMap, mark).start()
    }
  }

  return {};


};


