import * as schedule from 'node-schedule';
import * as RedLock from 'redlock'
import { IScheduleInfo, instance, helper } from '../types'
/**
 * @description
 * 定时任务
 * @exports
 * @class AbstractSchedule
 */

export abstract class AbstractSchedule {
    public scheduleInfo: IScheduleInfo;

    public redLock: RedLock

    public name: string;

    public app: any

    public job: schedule.Job

    /**
     * redLock
     * 锁的生存时间，在该时间内，若锁未释放，强行释放
     */
    private redLockTKL: number

    logger: any;

    constructor(app: IScheduleInfo) {
        this.app = app;
        this.job = this.job
    }

    /**
     * @description 定义任务
     * @abstract
     * @memberof AbstractSchedule
     */
    public abstract task();

    /**
    * @description
    * 延迟主动释放锁
    * @private
    * @param {any} ms
    * @returns
    * @memberof AbstractSchedule
    */
    private sleep(ms: number) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, ms);
        });
    }

    /**
     * @description
     * 同步执行任务
     * @private
     * @param {any} lock
     * @returns
     * @memberof AbstractSchedule
     */

    private async execTask(lock: RedLock.Lock) {

        const { sleep } = this.scheduleInfo

        await this.task();

        if (!sleep) throw new Error('Schedule task must have sleep')

        await this.sleep(sleep);

        return lock.unlock()
            .catch((err: any) => {
                console.error('上锁失败', err);
            });
    }

    /**
         * @description
         * 开启任务,使用redis同步锁，保证任务单实例执行
         * @private
         * @param IScheduleInfo scheduleInfo
         * @param {Function} callback
         * @param {*} name
         * @returns
         * @memberof AbstractSchedule
         */
    public startSchedule() {
        const { name, rule, redLockTKL, redLock } = this.scheduleInfo

        if (!name) throw new Error('Schedule task must have name')

        // 重复执行判断
        if (!Reflect.get(scheduleHelper, name)) {
            // 记录已执行过的任务
            Reflect.set(scheduleHelper, name, true);
            // 创建定时任务
            this.job = schedule.scheduleJob(rule, async () => {

                // 启动redis分布式时，采用锁方案
                if (redLock) {

                    if (!redLockTKL) throw new Error('Schedule task must have redLockTKL')

                    try {
                        redLock.lock(name, redLockTKL).then((lock) => {

                            this.execTask(lock)

                        }, () => console.log(`该实例不执行定时任务:${this.scheduleInfo.name},由其他实例执行`))
                    } catch (error) {
                        console.log(error)
                    }

                } else {
                    console.log(`执行时间:${new Date()}`)

                    await this.task();
                }

            })

        } else {
            console.error('This task has already been performed')
        }


    }

    /**
     * @description
     * 启动入口
     */

    public start() {
        // 配置该参数为 false 时，这个定时任务不会被启动。
        if (this.scheduleInfo.switch) this.startSchedule()
    }

    /**
    * @description
    * 取消当前定时任务
    */
    public cancel() {
        const { name } = this.scheduleInfo
        Reflect.set(scheduleHelper, name, false);
        this.job.cancel()
    }


}

/**
 * 调用者当前实例
 */
export const scheduleMap: instance = {}

export const umaTask = (mark: string): AbstractSchedule => {
    if (!mark) throw new Error(' The mark attribute of the scheduled task must exist')
    if (!Reflect.get(scheduleMap, mark)) throw new Error(' The mask attribute does not exist in task config')
    return Reflect.get(scheduleMap, mark)

}

/**
 * 记录任务是否已执行
 */
export const scheduleHelper: helper = {}
