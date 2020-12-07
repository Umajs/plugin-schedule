
import {AbstractSchedule}  from '../../src/schedule'
import { scheduleMap } from "../../src/schedule"
export default class PvSchedule extends AbstractSchedule {
    constructor(app){
        super(app)
        this.scheduleInfo = {
            ...app,
            name: 'pv',
            switch: true, // 定时任务开启
            rule: '*/5 * * * * ?', // 每1分鐘更新一次
        }

        setTimeout(()=>{
            Reflect.get(scheduleMap,"RedisSchedule").start()
        },2000)

        setTimeout(()=>{
            Reflect.get(scheduleMap,"RedisSchedule").start()
        },3000)

        setTimeout(()=>{
            Reflect.get(scheduleMap,"RedisSchedule").cancel()
        },7000)

    }

    /**
     * 业务实现
     */
    public task() {
       console.log("22222222")
       // todo task
    }

}
