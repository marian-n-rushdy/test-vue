import Vue from 'vue'
import Vuex from 'vuex'
import BlackboardModule from '../agentskit/memory/blackboard'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    lastUserInteraction: Date.now(),
    currentTime: Date.now()
  },
  getters: {
    getCurrentTime: (state) => () => {
      return state.currentTime
    },
    lastUserInteraction: (state) => () => {
      return state.lastUserInteraction
    },
    timeSinceLastInteraction: (state) => () => {
      return state.currentTime - state.lastUserInteraction
    },
    isUserIdle: (state, getters) => () => {
      return getters.timeSinceLastInteraction() > 2000
    }
  },
  mutations: {
    setTime(state, args) {
      state.currentTime = args.time
    },
    setLastUserInteraction(state, args) {
      state.lastUserInteraction = args.time
    }
  },
  actions: {
    startTimer(context) {
      setInterval(() => {
        context.commit({type: 'setTime', time: Date.now()})
      }, 100)
    },
    updateLastUserInteraction(context) {
      context.commit({type: 'setLastUserInteraction', time: Date.now()})
    }
  },
  modules: {
    blackboard: BlackboardModule
  },
})

export default store;

store.dispatch({type: 'startTimer'})