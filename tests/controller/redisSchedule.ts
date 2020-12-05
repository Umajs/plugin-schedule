
import {AbstractSchedule}  from '../../src/schedule'

export default class RedisSchedule extends AbstractSchedule {
    constructor(app){
        super(app)
        this.scheduleInfo = {
            // ...configDefault,
            ...app
   
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
