
import {AbstractSchedule}  from '../../src/schedule'

export default class PvSchedule extends AbstractSchedule {
    constructor(app){
        super(app)
        this.scheduleInfo = {
            ...app
        }
    }

    /**
     * 业务实现
     */
    public task() {
       console.log("22222222")
       // todo task
    }

}
