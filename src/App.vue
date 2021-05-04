<template>
  <div @click="$store.dispatch({type: 'updateLastUserInteraction'})">
    <div>
      Hello World, {{$store.getters.getCurrentTime()}}
    </div>
    <div>
      {{$store.getters.lastUserInteraction()}}
    </div>

    <div>
      {{$store.getters.timeSinceLastInteraction()}}
    </div>

    <div v-if="$store.getters.isUserIdle()">Yes, the user is Idle</div>
  </div>
</template>

<script>

export default {
  name: 'App',
  // mounted() {
  //   this.$store.dispatch({type: 'startTimer'})
  // }
}
</script>

<style>
</style>
