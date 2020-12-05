import * as Redis from 'ioredis'
import * as RedLock from 'redlock'
import PvSchedule from '../controller/pvSchedule'
import RedisSchedule from '../controller/RedisSchedule'

const redis = new Redis({
    port: 50238, // Redis port
    host: "test-ugg15.rdb.58dns.org", // Redis host
    family: 4, // 4 (IPv4) or 6 (IPv6)
    password: "23065b04129b82d7",
    db: 0,
});
export default [
    {
        task: PvSchedule,
        auto: true, // 自动执行 
        options: {
            rule: '0 0/1 * * * ?', // 每1分鐘更新一次
            name: 'pv',
            switch: true, // 定时任务开启
        }
    },
    {
        task: RedisSchedule,
        auto: true,
        options: {
            rule: '0 0/1 * * * ?', // 每1分鐘更新一次
            name: 'redis',
            switch: true, // 定时任务开启
            redLock: new RedLock([redis], {  // 分布式部署，redis加锁
                retryDelay: 300,
                retryCount: 5
            }),
            redLockTKL: 100000, // 自动释放锁时间
            sleep:10000, // 主动释放锁时间
        }
    },

]
