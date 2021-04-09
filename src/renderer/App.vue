<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {call,get, sync} from 'vuex-pathify'
export default {
  name: 'my-player',
  async mounted(){
    this.playing = false
    await this.init()
  },
  computed:{
    playing: sync('change/playing')
  },
  methods:{
    init: call('myapp/init'),
  }
}
</script>

<style lang="scss">
@import "@/scss/global";
 ::-webkit-scrollbar{
    width: 3px;
    height: 1px;
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: $theme-color;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 1px rgba(0,0,0,0);
    border-radius: 3px;
    background: $theme-lighten-color;
  }
</style>
