<template>
  <div class="mv-container">
    <p class="mv-title">{{ video.data.name }}</p>

    <div class="mv-player">
      <div class="player">
        <video ref="videoPlayer" class="plyr" />
      </div>

      <div class="player-info">
        <router-link class="mv-artist" :to="'/artist/' + video.data.artistId">{{
          video.data.artistName
        }}</router-link>
        · <span class="nums">{{ video.data.playCount }}</span
        >Views ·
        <span class="time">{{ video.data.publishTime }}</span>
      </div>
    </div>

    <div class="mv-simi">
      <p class="simi-title">相关推荐</p>
      <div class="simi-content">
        <!-- <video-cover v-for="mv of simi" :key="mv.id"></video-cover> -->
        <a-row justify="space-between" :gutter="[18,18]">
            <a-col :span="6" v-for="mv of simi" :key="mv.id">
                <video-cover :video="mv"></video-cover>
            </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mvDetail, mvUrl, simiMv } from '@/api'
import Plyr from 'plyr'
import 'plyr/dist/plyr.css'
import { sync } from 'vuex-pathify'
import VideoCover from '@/components/default/VideoCover'
export default {
  name: 'MusicVideo',
  data: () => ({
    player: null,
    video: {
      url: '',
      data: {
        name: '',
        artistName: '',
        playCount: '',
        publishTime: ''
      }
    },
    simi: []
  }),
  props: {
    id: String
  },
  components: {
    VideoCover
  },
  watch: {
    id () {
      this.fetch()
    }
  },
  mounted () {
    this.initPlayer()
    this.fetch()
  },
  computed: {
    volume: sync('settings/volume')
  },
  methods: {
    initPlayer () {
      console.log(this.id)
      const videoOptions = {
        settings: ['quality'],
        autoplay: false,
        quality: {
          default: 1080,
          options: [1080, 720]
        }
      }
      this.player = new Plyr(this.$refs['videoPlayer'], videoOptions)
      this.player.volume = this.volume
      this.player.on('playing', () => {
        // 暂停音乐播放
      })
    },
    async fetch () {
      const _video = await mvDetail(this.id)
      //   console.log(_video);
      this.video = _video
      const { name: title, cover } = _video.data
      const sources = await this.getAllUrl([1080, 720], this.id)
      this.player.source = {
        type: 'video',
        title,
        sources,
        poster: cover.replace(/^http:/, 'https:')
      }
      const { mvs } = await simiMv(this.id)
      this.simi = mvs
    },
    async getAllUrl (qualities, id) {
      const fns = qualities.map((quality) => {
        return mvUrl({ id, r: quality })
      })
      const urls = await Promise.all(fns)
      console.log(urls)
      return urls.map((result) => {
        return {
          src: result.data.url.replace(/^http:/, 'https:'),
          type: 'video/mp4',
          size: result.data.r
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/scss/common";
.mv-title,
.simi-title {
  @include content-text-h6;
}

.player-info {
  @include content-text-h8;
  color: $main-text-color;
  margin: 20px 0;
}

.player {
//   overflow: hidden;
//   max-height: 68vh;
}

.mv-simi a{
    color: $main-text-color !important;
}
</style>
