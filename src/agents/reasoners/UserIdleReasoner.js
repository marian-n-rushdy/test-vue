import { SENSOR_NAME, LAST_USER_ACTION_TIME_KEY } from '../sensors/UserActivitySensor'

export const USER_IS_IDLE_KEY = 'user-is-idle'
export const REASONER_NAME = 'user-activity-sensor'

export const UserIdleReasoner = {
    namespaced: true,
    strict: true,
    state: {
        agent: null,
        maxIdleTime: 360 * 1000,
        currentTime: Date.now()
    },
    getters: {},
    mutations: {},
    actions: {
        update(context) {
            let lastUserActivityTime = context.rootGetters['blackboard/getValue', { namespace: SENSOR_NAME, key: LAST_USER_ACTION_TIME_KEY}]
            let args = {
                namespace: REASONER_NAME,
                key: USER_IS_IDLE_KEY,
                value: (context.state.currentTime - lastUserActivityTime) > context.state.maxIdleTime
            }
            context.dispatch('blackboard/setValue', args, { root: true })
        }
    }
}