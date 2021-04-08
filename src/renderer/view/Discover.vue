<template>
  <div class="discover">
    <a-row>
      <a-col :span="14">
        <div class="big-ban">
          <div class="title">新碟上架</div>
          <a-card :bordered="false" hoverable>
            <div
              class="ban-img"
              :style="`background-image: url('${release.picUrl}')`"
            >
              <div class="ban-img-content">
                <p class="ban-artist">{{ release.company }}</p>
                <p class="ban-title">{{ release.name }}</p>
                <div class="btn-area">
                  <a-button class="btn-play" shape="round" @click="clickNewRelease(release)">
                    <my-icon type="icon-bofang"></my-icon>
                    NOW PLAYING</a-button
                  >
                  <a-button class="btn-like" shape="circle" @click="clickLikeNew(release)"
                    >
                    <my-icon type="icon-xihuan1" v-if="!liked"></my-icon>
                    <my-icon type="icon-xihuan2" v-else></my-icon>
                  </a-button>
                </div>
              </div>
            </div>
          </a-card>
        </div>

        <div class="recm-mv">
          <div class="title">推荐MV</div>
          <a-row>
            <a-col :span="12" v-for="item of mvs" :key="item.id">
              <video-cover :video="item" />
            </a-col>
          </a-row>
        </div>
      </a-col>

      <a-col :span="10">
        <div class="hot-albums">
          <div class="title">热门歌单</div>
          <a-row>
            <a-col :span="12" v-for="item of playLists" :key="item.id">
              <album-cover :data="item"  type="playlist"/>
              <span class="albums-type">{{ item.copywriter }}</span>
            </a-col>
          </a-row>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import VideoCover from '@/components/default/VideoCover'
import AlbumCover from '@/components/default/AlbumCover'
import { getPersonalized, newAlbums, getMv, getAlbum } from '@/api'
import { mapGetters } from 'vuex'
export default {
  name: 'Discover',
  data: () => ({
    playLists: [],
    release: {},
    mvs: []
  }),
  components: {
    VideoCover,
    AlbumCover
  },
  async created () {
    try {
      const [playlists, { albums }, { result: mvs }] = await Promise.all([
        getPersonalized(),
        newAlbums({ limit: 2, area: 'EA' }),
        getMv()
      ])
      this.playLists = playlists.result.slice(0, 6)
      this.release = albums[1]
      this.mvs = mvs
    } catch (e) {
      console.log(e)
    }
  },
  computed: {
    ...mapGetters({
      liked: 'change/liked'
    }),
    likedSong () {
      return !this.liked ? {icon: 'icon-xihuan1'} : {icon: 'icon-xihuan2'}
    }
  },
  methods: {
    async clickNewRelease (release) {
      const data = await getAlbum(release.id)
      // console.log(data.songs[0])
      this.$store.dispatch('change/updateTrack', data.songs[0])
    },
    async clickLikeNew (release) {
      // this.liked = !this.liked
      const data = await getAlbum(release.id)
      this.$store.dispatch('change/favSong', {
        id: data.songs[0].id,
        like: !this.liked
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/scss/common";
// 某些需要设置全局才有效
.ant-card :global(.ant-card-body) {
  padding: 0;
  border-radius: 8px;
}

.ant-col {
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .title {
    @include content-text-h6;
  }

  .big-ban {
    margin-bottom: 30px;
    .ant-card {
      border-radius: 8px;
      .ban-img {
        @include hover-box;
        position: relative;
        .ban-img-content {
          padding-left: 22px;
          padding-bottom: 22px;
          position: absolute;
          bottom: 0;
          color: $theme-color;
          .ban-artist {
            font-size: 1rem;
            margin-bottom: 0.3rem;
          }
          .ban-title {
            font-size: 1.2rem;
            font-weight: 700;
            margin-bottom: 0.8rem;
          }
          .btn-area {
            button {
              padding: 5px;
              color: #fff;
              font-weight: 700;
              border-color: transparent;
              background: $theme-color;
              opacity: 0.8;

              &:hover {
                opacity: 1;
              }
            }
            .btn-play {
              padding-right: 10px;
              .anticon {
                margin-left: 5px;
                line-height: 0;
              }
            }
            .btn-like {
              opacity: 0.6;
              .anticon {
                font-size: 1rem;
                margin-top: 3px;
              }
            }
          }
        }
      }
    }
  }

  .recm-mv {
  }

  .hot-albums {
    .albums-type {
      color: #bdbdbd;
      font-size: 0.75rem;
      font-weight: 400;
      letter-spacing: 0.0333333333em;
      @include letter-overflow
    }
  }
}
</style>
