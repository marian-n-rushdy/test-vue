
// export class UserActivitySensor extends Sensor {
//     sense() {
//         if ($store.getters.timeSinceLastInteraction()> 
//     }
// }

export const SENSOR_NAME = 'user-activity-sensor'
export const LAST_USER_ACTION_TIME_KEY = 'last-user-action-time-key'

export const UserActivitySensor = {
    namespaced: true,
    strict: true,
    state: {
        agent: null,
        lastUserInteraction: Date.now(),
        newData: true
    },
    getters: {
        lastUserInteraction: (state) => () => {
            return state.lastUserInteraction
        },
    },
    mutations: {
        setLastUserInteraction(state, args) {
            state.lastUserInteraction = args.time
        },
        setNewDataFlagTrueIfFalse(state) {
            if(state.newData == false) {
                state.newData = true
            }
        },
        setNewDataFlagFalseIfTrue(state, args) {
            if(state.newData == true) {
                state.newData = false
                args.success = true
            }
            args.success = false
        }
    },
    actions: {
        updateLastUserInteraction(context) {
            context.commit({type: 'setLastUserInteraction', time: Date.now()})
            context.commit({type: 'setNewDataFlagTrueIfFalse'})
        },
        sense(context) {
            let args = { success: false }
            context.commit({type: 'setNewDataFlagFalseIfTrue', args })
            if(args.success) {
                args = {
                    namespace: SENSOR_NAME,
                    key: LAST_USER_ACTION_TIME_KEY,
                    value: context.state.lastUserInteraction
                }
                context.dispatch('blackboard/setValue', args, { root: true })
            }
        }
    }
}