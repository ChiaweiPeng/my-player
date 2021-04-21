<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { call, get, sync } from "vuex-pathify";
export default {
  name: "my-player",
  async mounted() {
    this.playing = false;
    await this.init();
  },
  computed: {
    playing: sync("change/playing"),
    nightMode: sync("myapp/nightMode"),
  },
  methods: {
    init: call("myapp/init"),
  },
};
</script>

<style lang="scss">
@import "@/scss/global";
::-webkit-scrollbar {
  width: 3px;
  height: 1px;
  border-radius: 5px;
}
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: $theme-color;
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0);
  border-radius: 3px;
  background: $theme-lighten-color;
}
body {
  background: var(--color-gray-100) !important;
}

:root {
  --color-gray-100: #fff;
  --color-gray-150: #f9f9f9;
  --color-gray-200: #f5f6f7;
  --color-gray-250: #efefef;
  --color-gray-300: #dadada;
  --color-gray-400: #ccd0d5;
  --color-gray-500: #bec3c9;
  --color-gray-600: #8d949e;
  --color-gray-650: #757474;
  --color-gray-700: #606770;
  --color-gray-800: #444950;
  --color-gray-850: #303846;
  --color-gray-900: #2c323c;
  --color-gray-950: #1c1e21;
  --color-font: var(--color-gray-900);
  --color-card: var(--color-gray-100);
  --color-blue-200: #e6f7ff;
}
body.nightmode {
  --color-gray-100: #1c1e21;
  --color-gray-150: #2c323c;
  --color-gray-200: #303846;
  --color-gray-250: #444950;
  --color-gray-300: #606770;
  --color-gray-400: #757474;
  --color-gray-500: #8d949e;
  --color-gray-600: #bec3c9;
  --color-gray-650: #ccd0d5;
  --color-gray-700: #dadada;
  --color-gray-800: #eaecef;
  --color-gray-850: #f5f6f7;
  --color-gray-900: #f9f9f9;
  --color-gray-950: #fff;
  --color-font: var(--color-gray-600);
  --color-card: var(--color-gray-150);
  --color-blue-200: #444950;
}
</style>
