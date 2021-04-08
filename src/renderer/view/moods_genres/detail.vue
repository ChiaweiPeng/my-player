<template>
  <div class="detail-container">
      <!-- MoodsGenresDetail{{type}} -->
      <h2 class="title">
          {{type}}
      </h2>

      <div>
          <p class="title">精选</p>
          <div class="content">
              <a-row :gutter="[16,16]">
                  <a-col :span="4" v-for="item of playlists.slice(0,3)" :key="item.id">
                      <album-cover :data="item" type="playlist"></album-cover>
                  </a-col>
              </a-row>
          </div>
      </div>

      <div>
          <p class="title">播放列表</p>
          <div class="content">
              <a-row :gutter="[16,16]">
                  <a-col :span="4" v-for="item of playlists.slice(3)" :key="item.id">
                      <album-cover :data="item" type="playlist"></album-cover>
                  </a-col>
              </a-row>
          </div>
      </div>
  </div>
</template>

<script>
import {getTopPlaylist} from '@/api'
import AlbumCover from '@/components/default/AlbumCover'
export default {
  name: 'MoodsGenresDetail',
  data: () => ({
    playlists: []
  }),
  props: {
    type: {
      type: String,
      default: '官方'
    }
  },
  components: {
    AlbumCover
  },
  watch: {
    type () {
      this.fetch()
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    async fetch () {
      const condition = { cat: this.type, offset: 0, limit: 15}
      const {playlists} = await getTopPlaylist(condition)
      this.playlists = playlists
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/scss/common";
.title{
    @include content-text-h6
}
</style>
