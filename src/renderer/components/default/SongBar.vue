<template>
  <a-menu mode="inline" 
  :style="`overflow:${overflow ? overflow : 'hidden'};maxHeight:${maxHeight? 'auto' : '60vh'}`"
  >
    <a-menu-item
      v-for="(song, idx) of playingList"
      :key="idx"
      @click="handleClikeItem"
    >
      <single-bar :song="song" :limitWidth="limitWidth"></single-bar>
    </a-menu-item>
  </a-menu>
</template>

<script>
import SingleBar from '@/components/default/SingleBar'
export default {
  name: "SongBar",
  data: () => ({}),
  props: {
    playingList: {
      type: Array,
      default: () => [],
    },
    overflow: String,
    maxHeight: Boolean,
    limitWidth: Boolean
  },
  components: {
    SingleBar
  },
  computed: {},
  methods: {
    async handleClikeItem(){
      await this.$store.dispatch("change/updatePlayingList", this.playingList)
    }
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/common";
.ant-menu-inline {
  border-right: none;
  // max-height: 70vh;
  overflow-x: hidden !important;
  background: var(--color-gray-100) !important;
  .ant-menu-item {
    height: auto !important;
    padding: 5px 10px !important;
    width: 100% !important;
    &:hover {
      background-color: var(--color-blue-200);
    }
  }
}
</style>
