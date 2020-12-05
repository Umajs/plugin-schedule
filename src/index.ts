import { Uma, TPlugin } from "@umajs/core";
import { AbstractSchedule } from "./schedule"
import { IScheduleInfo } from "./schedule/interface";

type taskConfig ={
  auto:boolean;
  task: (arg0: IScheduleInfo)=> void 
  options:IScheduleInfo
}
export default (uma: Uma): TPlugin => {

    const config = uma.config
    
    const scheduleList:Array<AbstractSchedule> = [];

    const taskConfig:taskConfig[] =config.schedule

    for(let i = 0 ;i<taskConfig.length;i++){
      let { auto, task, options } =taskConfig[i]
      
      if(auto){
        new task(options).start()
      }
    }

    return {};

    
};


