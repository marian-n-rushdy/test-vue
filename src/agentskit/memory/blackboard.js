export const BlackboardModule = {
    namespaced: true,
    strict: true,
    state: {
        values: new Map(),
        cashedSnapshot: null
    },
    getters: {
        hasValue: (state, namespace, key) => () => {
            return state.values.has(namespace + key);
        }, 
        getValue: (state, namespace, key) => () => {
            return state.values.get(namespace + key);
        },
        newSnapshot: (state) => () => {
            state.cashedSnapshot = new Map();
            for(var i in state.values) {
                state.cashedSnapshot = state.values[i]
            }
            return state.cashedSnapshot;
        }
    }, 
    mutations: {
        setValue(state, namespace, key, value) {
            state.values.set(namespace + key, value);
        },
        remove(state, namespace, key) {
            state.values.delete(namespace + key)
        }
    },
    actions: {
        setValue(context, args) {
            context.commit('setValue', args.namespace, args.key, args.value)
        }
    }
}