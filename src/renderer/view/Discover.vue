<template>
  <div class="discover">
    <a-row>
      <a-col :span="14">
        <div class="big-ban">
          <div class="title">New Release</div>
          <a-card :bordered="false" hoverable>
            <div
              class="ban-img"
              :style="`background-image: url('${release.picUrl}')`"
            >
              <div class="ban-img-content">
                <p class="ban-artist">{{ release.company }}</p>
                <p class="ban-title">{{ release.name }}</p>
                <div class="btn-area">
                  <a-button class="btn-play" shape="round">
                    <my-icon type="icon-bofang"></my-icon>
                    NOW PLAYING</a-button
                  >
                  <a-button class="btn-like" shape="circle"
                    ><my-icon type="icon-xihuan1"></my-icon
                  ></a-button>
                </div>
              </div>
            </div>
          </a-card>
        </div>

        <div class="recm-mv">
          <div class="title">Recommend Music Video</div>
          <a-row>
            <a-col :span="12" v-for="item of mvs" :key="item.id">
              <video-cover :video="item" />
            </a-col>
          </a-row>
        </div>
      </a-col>

      <a-col :span="10">
        <div class="hot-albums">
          <div class="title">Hot albums</div>
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
import { getPersonalized, newAlbums, getMv } from '@/api'
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
        newAlbums({ limit: 1, area: 'EA' }),
        getMv()
      ])
      this.playLists = playlists.result.slice(0, 6)
      this.release = albums[0]
      this.mvs = mvs
    } catch (e) {
      console.log(e)
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
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>
