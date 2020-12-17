"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schedule_1 = require("./schedule");
exports.default = (uma) => {
    const config = uma.config;
    const taskConfig = config.schedule;
    for (let i = 0; i < taskConfig.length; i++) {
        const { auto, task, options, mark } = taskConfig[i];
        if (!mark)
            throw new Error(' The mark attribute of the scheduled task must exist');
        const initTask = new task(options);
        Reflect.set(schedule_1.scheduleMap, mark, initTask);
        if (auto) {
            Reflect.get(schedule_1.scheduleMap, mark).start();
        }
    }
    return {};
};
