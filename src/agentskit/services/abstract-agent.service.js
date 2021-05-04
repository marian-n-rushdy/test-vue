import { UserActivitySensor } from "../../agents/sensors/UserActivitySensor";
import store from '../../store'

export class AbstractAgentService {

    agent;
    sensors = [];
    reasoners = [];
    behaviors = [];
    scheduler;
    context;

    constructor(agent) {
        if(this.constructor == AbstractAgentService){
            throw new Error(" Object of Abstract Class cannot be created");
        }
        this.agent = agent;
    }

    getAgent() {
        return this.agent;
    }

    installSensor(sensor) {
        // something like this
        this.sensors.push(sensor);

        // vs something like this - which could be done withing the agent 
        // itself rather than here 
        store.registerModule(['sensors', 'userActivitySensor'], UserActivitySensor)
    }

    installReasoner(reasoner) {
        this.reasoners.push(reasoner);
    }

    installBehavior(behavior) {
        this.behaviors.push(behavior);
    }
}