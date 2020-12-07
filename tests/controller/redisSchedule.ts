
import {AbstractSchedule}  from '../../src/schedule'

export default class RedisSchedule extends AbstractSchedule {
    constructor(app){
        super(app)
        this.scheduleInfo = {
            // ...configDefault,
            ...app,
            name: 'redis',
            switch: true, // 定时任务开启
            rule: '*/5 * * * * ?', // 每1分鐘更新一次
   
        }
        
    }

    /**
     * 业务实现
     */
    public task() {
       console.log("111111")
       // todo task  uma.app

    }

}
