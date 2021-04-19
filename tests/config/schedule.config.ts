import * as Redis from 'ioredis'
import * as RedLock from 'redlock'
import PvSchedule from '../controller/pvSchedule'
import RedisSchedule from '../controller/RedisSchedule'

const redis = new Redis({
    port: 0, // Redis port
    host: "", // Redis host
    family: 4, // 4 (IPv4) or 6 (IPv6)
    password: "",
    db: 0,
});
export default [
    {
        task: PvSchedule,
        auto: true, // 自动执行 
        mark:'PvSchedule',
        options: {
            // rule: '0 0/1 * * * ?', // 每1分鐘更新一次
            // name: 'pv',
            // switch: true, // 定时任务开启
            // rule: '*/5 * * * * ?', // 每1分鐘更新一次
        }
    },
    {
        task: RedisSchedule,  // 任务的controller
        auto: false,    
        mark:'RedisSchedule', // 任务的标记
        options: {
        
        }
    },

]
