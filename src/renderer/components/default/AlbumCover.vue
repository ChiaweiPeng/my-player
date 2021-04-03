<template>
  <div class="album-cover">
    <div class="album-img" :style="`background-image: url('${coverBgUrl}')`">
      <div class="btn-area">
        <a-button class="al-play" shape="circle" @click="play"
          ><my-icon type="icon-bofang"></my-icon
        ></a-button>
        <a-button class="al-content" shape="circle" @click="play"
          ><my-icon type="icon-shenglve"></my-icon
        ></a-button>
      </div>
    </div>
    <p class="album-name">
      <!-- <router-link to="/"> -->
      <a :href="data.link">{{ data.name }}</a>
      <!-- </router-link> -->
    </p>
  </div>
</template>

<script>
import { getPlayList, getAlbum, getArtist } from '@/api'
import {dispatch} from 'vuex-pathify'
export default {
  name: 'AlbumCover',
  data: () => ({
    // defaultCover: require("@/assets/default-cover.jpg"),
  }),
  props: {
    data: {
      type: Object,
      default: () => ({
        id: 3117618863,
        name: '所以你并没有坚定选择过我.',
        copywriter: '热门推荐',
        picUrl:
          'https://p1.music.126.net/6mnrODz-pMVBq8UReZqfLA==/109951165533152791.jpg'
      })
    },
    type: {
      type: String,
      default: 'album'
    }
  },
  components: {},
  computed: {
    coverBgUrl () {
      return this.data.picUrl ? this.data.picUrl : this.data.coverImgUrl
    },
    service () {
      return {
        'album': getAlbum,
        'playlist': getPlayList,
        'artist': getArtist
      }[this.type]
    }
  },
  methods: {
    async play () {
      console.log('aa')
      const data = await this.service(this.data.id)
      let list = []
      if (this.type === 'album') {
        list = data.songs
      } else if (this.type === 'playlist') {
        list = data.playlist.tracks
      } else {
        list = data.list
      }
      // console.log(list)
      // this.$store.dispatch('test','pengjiawei')
      // this.$store.dispatch('edit')
      // await this.$store.dispatch('music/updatePlayingList', list)
      // await this.$store.dispatch('music/updateTack', {id: list[0].id})
      // this.loading = false
      // }

      // await this.$store.dispatch('change/updatemusic','沉默是金')
      await this.$store.dispatch('change/updatePlayingList',list)
      await this.$store.dispatch('change/updateTrack',{id:list[0].id})
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/scss/common";
.album-img {
  @include hover-box;
  @include box-btn-area1;
  padding-bottom: 100%;
}

.album-name {
  @include box-title;
  text-align: center;
  a {
    color: $main-text-color;
    border-bottom: 1px solid transparent;
    &:hover {
      border-bottom-color: #43a3fd;
      transition: 0.3s;
    }
  }
}
</style>
