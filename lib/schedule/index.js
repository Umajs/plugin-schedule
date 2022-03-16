"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleHelper = exports.umaTask = exports.scheduleMap = exports.AbstractSchedule = void 0;
const schedule = require("node-schedule");
class AbstractSchedule {
    constructor(app) {
        this.app = app;
        this.job = this.job;
    }
    sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, ms);
        });
    }
    async execTask(lock) {
        const { sleep } = this.scheduleInfo;
        await this.task();
        if (!sleep)
            throw new Error('Schedule task must have sleep');
        await this.sleep(sleep);
        return lock.unlock()
            .catch((err) => {
            console.error('上锁失败', err);
        });
    }
    startSchedule() {
        const { name, rule, redLockTKL, redLock } = this.scheduleInfo;
        if (!name)
            throw new Error('Schedule task must have name');
        if (!Reflect.get(exports.scheduleHelper, name)) {
            Reflect.set(exports.scheduleHelper, name, true);
            this.job = schedule.scheduleJob(rule, async () => {
                if (redLock) {
                    if (!redLockTKL)
                        throw new Error('Schedule task must have redLockTKL');
                    try {
                        redLock.lock(name, redLockTKL).then((lock) => {
                            this.execTask(lock);
                        }, () => console.log(`该实例不执行定时任务:${this.scheduleInfo.name},由其他实例执行`));
                    }
                    catch (error) {
                        console.log(error);
                    }
                }
                else {
                    console.log(`执行时间:${new Date()}`);
                    await this.task();
                }
            });
        }
        else {
            console.error('This task has already been performed');
        }
    }
    start() {
        if (this.scheduleInfo.switch)
            this.startSchedule();
    }
    cancel() {
        const { name } = this.scheduleInfo;
        Reflect.set(exports.scheduleHelper, name, false);
        this.job.cancel();
    }
}
exports.AbstractSchedule = AbstractSchedule;
exports.scheduleMap = {};
exports.umaTask = (mark) => {
    if (!mark)
        throw new Error(' The mark attribute of the scheduled task must exist');
    if (!Reflect.get(exports.scheduleMap, mark))
        throw new Error(' The mask attribute does not exist in task config');
    return Reflect.get(exports.scheduleMap, mark);
};
exports.scheduleHelper = {};
