<template>
  <a-popover
    title="播放列表"
    trigger="click"
    placement="bottomRight"
  >
    <template slot="content">
      <song-bar :playingList="playingList" :overflow="'auto'"></song-bar>
    </template>
    <a-button shape="circle" size="large" @click="handleShowList">
      <my-icon type="icon-playlist"></my-icon>
    </a-button>
  </a-popover>
</template>

<script>
import { mapState } from 'vuex'
import { sync } from 'vuex-pathify'
import SongBar from './SongBar'
export default {
  name: 'PlayingList',
  data: () => ({}),
  components: {
    SongBar
  },
  computed: {
    showList: sync('myapp/showList'),
    ...mapState({
      playingList: (state) => state.change.playingList
    })
  },
  methods: {
    handleCancel (e) {
      this.showList = false
    },
    handleShowList (e) {
      this.showList = !this.showList
    }
  }
}
</script>

<style scoped lang="scss">
</style>
