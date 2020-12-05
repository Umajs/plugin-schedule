
# 编写定时任务

例：我们在app/schedule 目录下创建一个
pvSchedule.ts文件
```

import {AbstractSchedule}  from '@umajs/core'

export default class PvSchedule extends AbstractSchedule {
    constructor(app){
        super(app)
        this.scheduleInfo = {
           // rule:'0 0/1 * * * ?', // 每1分鐘更新一次
           // name:'PV', // 定时任务名称
            // switch:true, // 开启定时任务
            // redLock:null // 不采用redis锁 
            // ...app
        }
    }

    /**
     * 业务实现
     */
    public task() {
       // todo task
    }

}


```
### 配置

1，在config/plugin.config.ts开启
```
 'task': {
        enable: true,
    }

```
2，新建schedule.config.ts，在其中填入配置项
```
export default =[
    {
        task: PvSchedule, // 定时任务类
        auto: true, // 自动执行 
        options: {
            rule: '0 0/1 * * * ?', // 每1分鐘更新一次
            name: 'pv',
            switch: true, // 定时任务开启
        }
    },
    {
        ...
    }]
```

### 任务
- 手动启动定时任务
```
new PvSchedule(app).start()
```

- 自动启动
```
 auto: true

```
- 手动关闭定时任务

```
new PvSchedule(app).cancel()

```
### 定时方式 

- Cron风格定时器 （建议使用Cron风格,避免服务器时间不一致）
```
*  *  *  *  *  *
┬ ┬ ┬ ┬ ┬ ┬
│ │ │ │ │  |
│ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
│ │ │ │ └───── month (1 - 12)
│ │ │ └────────── day of month (1 - 31)
│ │ └─────────────── hour (0 - 23)
│ └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)

6个占位符从左到右分别代表：秒、分、时、日、月、周几


```

- interval风格定时器，更多配置参考 node-schedule 
```
import * as schedule from 'node-schedule';
let rule = new schedule.RecurrenceRule();
rule.second =[0,1,2,3......59] 每秒执行
rule.second =0 每分钟0秒执行
rule.minute =0 每小时30分执行

this.scheduleInfo = {
            rule, // 每1分鐘更新一次
        }
```

### 集群/分布式部署 执行定时任务

- 插件包含在分布式部署下，需要保证同一个定时任务只能运行一次，所以需要用事物锁来控制;
- 插件采用的是分布式事务锁方案，支持单台redis和多台redis方案，基于redis实现


```
import * as RedLock  from 'redlock'

var client1 = require('redis').createClient(6379, 'redis1.example.com');
var client2 = require('redis').createClient(6379, 'redis2.example.com');
export default =[
    {
        task: PvSchedule, // 定时任务类
        auto: true, // 自动执行 
        options: {
            rule: '0 0/1 * * * ?', // 每1分鐘更新一次
            name: 'pv', // 任务名称
            switch: true, // 定时任务开启
            redLock:new RedLock([client1,client2]) // 采用redis锁 
            redLockTKL:10000 //单位毫秒，锁的生存时间，在该时间内，若锁未释放，强行释放 避免死锁情况
        }
    },
```




