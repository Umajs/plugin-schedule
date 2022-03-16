import { RecurrenceRule, RecurrenceSpecDateRange, RecurrenceSpecObjLit } from 'node-schedule';
import * as RedLock from 'redlock';
import { AbstractSchedule } from '../schedule/index';
export interface IScheduleInfo {
    rule: string | number | Date | RecurrenceRule | RecurrenceSpecDateRange | RecurrenceSpecObjLit;
    name: string;
    redLockTKL?: number;
    switch: boolean;
    redLock?: RedLock;
    sleep?: number;
}
export interface redisOption {
    lockLeaseTime: number;
    lockTimeout: number;
    expiryMode: string;
    setMode: string;
}
export interface instance {
    [x: string]: AbstractSchedule;
}
export interface helper {
    [x: string]: boolean;
}
