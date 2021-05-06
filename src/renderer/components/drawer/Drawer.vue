<template>
  <a-drawer
    placement="bottom"
    height="100%"
    :closable="false"
    :visible="showLyricPage"
    @close="drawerClose"
    :drawer-style="backgroundBG"
  >
    <div class="lyric-page">
      <div class="drawer-header">
        <a-button ghost @click="showLyricPage = !showLyricPage"
          ><div class="tiao"></div
        ></a-button>
      </div>

      <div class="drawer-content">
        <div class="left">
          <div class="song-img">
            <a-avatar
              :size="400"
              :src="track.al.picUrl"
              shape="square"
            ></a-avatar>

            <div class="song-info">
              <div class="info">
                <p class="name">{{ track.name }}</p>
                <router-link :to="`/artist/${track.ar[0].id}`">
                  <a-button
                    class="artist"
                    type="link"
                    @click="showLyricPage = !showLyricPage"
                    >{{ track.ar[0].name }}</a-button
                  >
                </router-link>
              </div>

              <div class="like">
                <router-link :to="`/album/${$ochain(track, 'al', 'id')}`">
                  <a-button
                    shape="circle"
                    @click="showLyricPage = !showLyricPage"
                    ><a-icon type="ellipsis" />
                  </a-button>
                </router-link>
              </div>
            </div>
          </div>

          <div class="playbar-control">
            <a-slider
              @afterChange="onAfterPlaybarChange"
              v-model="currentTime"
              :max="~~(track.dt / 1000)"
              :min="0"
              :tipFormatter="null"
            ></a-slider>

            <div class="time">
              <span>{{ formatCurrentTime(currentTime) }}</span>
              <span>{{ formatTime(track.dt) }}</span>
            </div>

            <div class="btn-area">
              <a-button shape="circle" size="large" @click="handleClickLike"
                ><a-icon
                  type="heart"
                  theme="filled"
                  :style="{
                    fontSize: '1.2rem',
                    color: `${liked ? '#1890ff' : 'rgba(0, 0, 0, 0.65)'}`,
                  }"
              /></a-button>
              <a-button
                shape="circle"
                size="large"
                @click="handleClickBackMusic"
                ><a-icon
                  type="step-backward"
                  theme="filled"
                  :style="{ fontSize: '2rem' }"
              /></a-button>
              <a-button
                shape="circle"
                size="large"
                @click="handleClickStartPlay"
                ><a-icon
                  :type="playingState.icon"
                  theme="filled"
                  :style="{ fontSize: '2.6rem' }"
              /></a-button>
              <a-button
                shape="circle"
                size="large"
                @click="handleClickForwardMuisc"
                ><a-icon
                  type="step-forward"
                  theme="filled"
                  :style="{ fontSize: '2rem' }"
              /></a-button>
              <a-button shape="circle" size="large" @click="handleClickTabMode">
                <my-icon class="p-mode" :type="orderIconState.icon"></my-icon>
              </a-button>
            </div>

            <div class="volume-area">
              <span>
                <my-icon
                  class="p-vol"
                  type="icon-yinliangxiaoyinliangxiao"
                ></my-icon>
              </span>

              <div class="volume-track">
                <a-slider v-model="volume" :max="1" :step="0.01"></a-slider>
              </div>

              <span>
                <my-icon
                  class="p-vol"
                  type="icon-yinliangdayinliangda"
                ></my-icon>
              </span>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="lyric-container" ref="lyricContainer">
            <ul v-if="lyric.length">
              <li
                v-for="(item, index) of lyric"
                :key="index"
                :class="{ active: index === activeIdx }"
              >
                {{ item.sentence }}
              </li>
            </ul>

            <ul v-else>
              <li>这是一首纯音乐</li>
              <li>请用心聆听</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </a-drawer>
</template>

<script>
import { sync, get, dispatch, commit } from "vuex-pathify";
import { formatDuring, formatLyric } from "@/utils/fn";
import { findIndex } from "lodash";
import { mapGetters } from "vuex";
export default {
  name: "DefaultDrawer",
  data: () => ({
    activeIdx: -1,
    interval: null,
    showLyric: true,
    offsetY: 0,
  }),
  components: {},
  created() {},
  computed: {
    showLyricPage: sync("myapp/showLyricPage"),
    track: get("change/track"),
    playing: get("change/playing"),
    currentTime: sync("change/currentTime"),
    mode: sync("change/mode"),
    volume: sync("change/volume"),
    ...mapGetters({
      next: "change/nextTrackId",
      prev: "change/prevTrackId",
      liked: "change/liked",
    }),
    playingState() {
      return this.playing ? { icon: "pause-circle" } : { icon: "play-circle" };
    },
    orderIconState() {
      return [
        { icon: "icon-1_music84" },
        { icon: "icon-1_music85" },
        { icon: "icon-danquxunhuan2" },
      ][this.mode];
    },
    lyric() {
      if(this.track.lyric.nolyric){
        console.log('this is nolyric')
        return false
      }
      const { tlyric, lrc } = this.track.lyric;
      let lyric = lrc.lyric ? formatLyric(lrc.lyric) : [];
      let _tlyric = tlyric.lyric ? formatLyric(tlyric.lyric) : [];
      if (_tlyric.length) {
        return lyric.map((i) => {
          const _t = _tlyric.find((t) => t.time === i.time);
          return {
            sentence: `${i.sentence}${_t.sentence ? `<br>${_t.sentence}` : ""}`,
            time: i.time,
          };
        });
      } else {
        return lyric;
      }
    },
    backgroundBG() {
      return {
        backgroundImage: "url(" + this.track.al.picUrl + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
      };
    },
  },
  watch: {
    showLyricPage(val) {
      if (val) {
        this.initInterval();
      } else {
        clearInterval(this.interval);
      }
    },
  },
  mounted() {
    this.initInterval();
  },
  destroyed() {
    clearInterval(this.interval);
  },
  methods: {
    formatCurrentTime(val) {
      return formatDuring(val * 1000);
    },
    formatTime(val) {
      return formatDuring(val);
    },
    onAfterPlaybarChange(val) {
      // 歌词页为什么不能用seek拖动了
    },
    handleClickLike() {
      dispatch("change/favSong", {
        id: this.track.id,
        like: !this.liked,
      });
    },
    handleClickBackMusic(e) {
      dispatch("change/updateTrack", { id: this.prev });
    },
    handleClickStartPlay(e) {
      commit("change/playing", !this.playing);
    },
    handleClickForwardMuisc(e) {
      dispatch("change/updateTrack", { id: this.next });
    },
    handleClickTabMode() {
      this.mode < 2 ? this.mode++ : (this.mode = 0);
    },
    initInterval() {
      if (this.showLyric) {
        this.interval = setInterval(() => {
          this.caculate();
        }, 500);
      }
    },
    // 计算歌词滚动位置
    caculate() {
      const current = this.currentTime;
      const prevActiveIdx = this.activeIdx;
      // 找到当前播放的歌词句
      const activeIdx = findIndex(this.lyric, (o, idx) => {
        const next = this.lyric[idx + 1];
        // 定时器每500ms执行，找满足 播放时间crt<下一句出现时间时间，并大于当前该句的出现时间
        // o.time 为当前句的出现时间
        return (next ? current < next.time : true) && current >= o.time;
      });
      this.activeIdx = activeIdx;
      // 当前歌词渲染后计算出滚动位置，添加高亮样式并滚动父元素
      this.$nextTick(async () => {
        if (activeIdx >= 0 && prevActiveIdx !== activeIdx) {
          const container = this.$refs.lyricContainer;
          const activeEl = document.querySelector(".lyric-container .active");
          if (activeEl) {
            const newY = activeEl.offsetTop - activeEl.clientHeight * 5;
            container.style = `top: ${-newY}px ; transition:1s`;
          }
        }
      });
    },
    drawerClose() {
      this.showLyricPage = !this.showLyricPage;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/common";
.ant-btn {
  background-color: transparent;
}

.ant-drawer :global(.ant-drawer-wrapper-body) {
  // background-color:red;
  position: relative;
  z-index: 1;
  &:before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: inherit;
    filter: blur(10px);
    z-index: 2;
  }
}

.ant-drawer :global(.ant-drawer-body) {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 3;
}

.drawer-header {
  text-align: center;
  margin-bottom: 20px;
  .ant-btn {
    border-radius: 30px;
    .tiao {
      width: 6vw;
      height: 10px;
      border-radius: 10px;
      background: #333;
    }
  }
}

.drawer-content {
  display: flex;
  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    .song-info {
      width: 100%;
      margin: 20px 0;
      display: flex;
      justify-content: space-between;
      color: #999;
      .info > p {
        font-weight: 600;
        font-size: 1rem;
        margin-bottom: 5px;
        color: #999;
        cursor: default;
        &:hover {
          color: $theme-color;
          transition: 1s;
        }
      }
      .artist {
        padding: 0;
        color: #999;
        font-weight: 600;
        font-size: 1rem;
        border: none;
        &:hover {
          color: $theme-color;
          transition: 1s;
        }
      }
    }

    .playbar-control {
      @include slider;
      max-width: 400px;
      .ant-slider {
        margin: 0;
        padding: 0;
        height: 5px;
      }

      .time {
        display: flex;
        justify-content: space-between;
        span {
          font-size: 0.8rem;
        }
      }

      .btn-area {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 25px;
        .ant-btn {
          border-color: transparent;
          &:hover {
            border-color: transparent;
          }

          .p-mode {
            font-size: 1.3rem;
            color: rgba(0, 0, 0, 0.65);
          }
        }
      }

      .volume-area {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
        span {
          font-size: 1.3rem;
          padding: 0 15px;
          padding-bottom: 1px;
        }
        .volume-track {
          width: 23vw;
        }
      }
    }
  }
  .right {
    flex: 1;
    position: relative;
    overflow: auto;

    .lyric-container {
      position: absolute;
      li {
        display: block;
        font-size: 1.3rem;
        font-weight: 600;
        margin-bottom: 10px;
        line-height: 2.5rem;
        color: #999;

        &.active {
          color: $theme-color;
        }
      }
    }
  }
}
</style>
