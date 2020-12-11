
import { AbstractSchedule } from '../../src/schedule'
import { umaTask } from "../../src/schedule"
export default class PvSchedule extends AbstractSchedule {
    constructor(app) {
        super(app)
        this.scheduleInfo = {
            ...app,
            name: 'pv',
            switch: true, // 定时任务开启
            rule: '*/5 * * * * ?', // 每5秒鐘更新一次
        }

        setTimeout(() => {
            umaTask("RedisSchedule").start()
        }, 2000)

        setTimeout(() => {
            umaTask("RedisSchedule").start()
        }, 3000)

        setTimeout(() => {
            umaTask("RedisSchedule").cancel()
        }, 7000)

    }

    /**
     * 业务实现
     */
    public task() {
        console.log("22222222")
        // todo task
    }

}
