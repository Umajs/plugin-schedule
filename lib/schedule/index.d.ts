import * as schedule from 'node-schedule';
import * as RedLock from 'redlock';
import { IScheduleInfo, instance, helper } from '../types';
export declare abstract class AbstractSchedule {
    scheduleInfo: IScheduleInfo;
    redLock: RedLock;
    name: string;
    app: any;
    job: schedule.Job;
    private redLockTKL;
    logger: any;
    constructor(app: IScheduleInfo);
    abstract task(): any;
    private sleep;
    private execTask;
    startSchedule(): void;
    start(): void;
    cancel(): void;
}
export declare const scheduleMap: instance;
export declare const umaTask: (mark: string) => AbstractSchedule;
export declare const scheduleHelper: helper;
