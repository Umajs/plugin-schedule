
import { RecurrenceRule, RecurrenceSpecDateRange, RecurrenceSpecObjLit } from 'node-schedule';
import * as RedLock  from 'redlock'
export interface IScheduleInfo {
    rule:string | number | Date | RecurrenceRule | RecurrenceSpecDateRange | RecurrenceSpecObjLit // 定时规则
    name:string // 任务名称
    redLockTKL?:number // 锁过期时间
    switch:boolean // 任务开关
    redLock?:RedLock // 分布式锁
    sleep?:number
}

export interface redisOption{
    lockLeaseTime:number // 过期时间
    lockTimeout:number // 超时时间
    expiryMode:string
    setMode:string
}


