<template>
  <a-layout-footer>
      <div class="play-progress">
        <!-- <a-progress :percent="percent" :showInfo="false" :strokeLinecap="square"/> -->
        <a-slider
          @afterChange="onAfterPlaybarChange"
          v-model="currentTime"
          :max="~~(track.dt / 1000)"
          :min="0"
          :tipFormatter="tipFormatter"
        ></a-slider>
      </div>
      <div class="play-control">
        <div class="playbar-left">
          <div class="song-img">
            <a-avatar shape="square" :size="40" :src="`${track.al.picUrl}`" />
            <a-button type="square" size="large" class="tab-big">
              <my-icon type="icon-zhankai"></my-icon>
            </a-button>
          </div>

          <div class="song-info">
            <a href="" class="song-name">{{ track.name }}</a>
            <span class="text-dash">-</span>
            <a href="" class="song-artist">{{ track.ar[0].name }}</a>
          </div>
        </div>
        <div class="playbar-center">
          <a-button shape="circle" size="large" @click="handleClickLike">
            <my-icon
              class="p-like"
              :type="likeSong.icon"
            ></my-icon>
          </a-button>

          <a-button shape="circle" size="large" @click="handleClickBackMusic"
            ><my-icon class="p-back" type="icon-1_music83"></my-icon
          ></a-button>

          <a-button shape="circle" size="large" @click="handleClickStartPlay">
            <my-icon class="p-play" :type="playingState.icon"></my-icon>
          </a-button>

          <a-button shape="circle" size="large" @click="handleClickForwardMuisc"
            ><my-icon class="p-forward" type="icon-1_music82"></my-icon
          ></a-button>

          <a-button shape="circle" size="large" @click="handleClickTabMode">
            <my-icon
              class="p-mode"
              :type="orderIconState.icon"
            ></my-icon>
          </a-button>
        </div>
        <div class="playbar-right">
          <a-button shape="circle" size="large" @click="handleVolume">
            <my-icon
              class="p-vol"
              :type="volumeIcon.icon"
            ></my-icon>
          </a-button>
          <div class="volume-track">
            <a-slider
              @afterChange="onAfterVolumeChange"
              v-model="volume"
              :max="1"
              :step="0.1"
            ></a-slider>
          </div>
          <a-button shape="circle" size="large" @click="handleShowList">
            <my-icon type="icon-playlist"></my-icon>
          </a-button>
        </div>
      </div>
  </a-layout-footer>
</template>

<script>
import { sync, get, dispatch, commit } from "vuex-pathify";
import { mapGetters } from "vuex";
import { formatDuring } from "@/utils/fn";

import Player from "./Player";
let prevVolume = 1;
const PLAY_MODE = {
  CYCLE: 0,
  SINGLE_CYCLE: 1,
  RANDOM: 2,
};
export default {
  name: "DefaultPlaybar",
  extends: Player,
  data: () => ({
    liked:false
  }),
  components: {},
  computed: {
    track: get("change/track"),
    currentTrackId: get("change/currentTrackId"),
    playingList: get("change/playingList"),
    playing: get("change/playing"),
    loadAuido: get("change/loadAudio"),
    mode: sync('change/mode'),
    ...mapGetters({
      next: 'change/nextTrackId',
      prev: 'change/prevTrackId',
      // liked:'change/liked'
    }),

    likeSong() {
      return !this.liked ? {icon:"icon-1_music90"} :{icon:"icon-1_music90-copy"}
    },
    playingState() {
      return this.playing
        ? { icon: "icon-zanting-copy" }
        : { icon: "icon-bofang" };
    },
    orderIconState() {
      // 切换模式图标
      return([
        {icon:'icon-1_music84'},
        {icon:'icon-1_music85'},
        {icon:'icon-danquxunhuan2'}
      ])[this.mode]
    },
    volumeIcon(){
      return this.volume === 0 ? {icon: 'icon-yinliangxiaoyinliangxiao'} : {icon:'icon-yinliangdayinliangda'}
    }
  },
  watch: {
    playing(val) {
      this.$nextTick(() => {
        if (val) {
          this.play();
        } else {
          this.pause();
        }
      });
    },
  },
  // computed:{
  //   track:get('music/track'),
  //   currentTrackId: get('music/currentTrackId'),
  //   playingList: get('music/playingList'),
  //   playing: get('music/playing'),
  //   loadAudio: sync('music/loadAudio'),
  //   showList: sync('music/showList'),
  //   showLyricsPage: sync('music/showLyricsPage'),
  //   mode: sync('music/mode'),
  //   ...mapGetters({
  //     next: 'music/nextTrackId',
  //     prev:'music/prevTrackId',
  //     liked: 'music/liked'
  //   })
  // },
  methods: {
    onAfterPlaybarChange(val) {
      console.log("onAfterPlaybarChange:" + val);
      this.setSeek(val);
    },
    onAfterVolumeChange(val) {
      console.log("onAfterVolumeChange:" + val);
    },
    handleClickLike(e) {
      this.$store.dispatch('change/favSong',{id: this.id, like:!this.liked})
    },
    handleClickBackMusic(e) {
      this.$store.dispatch('change/updateTrack',{id:this.prev})
    },
    handleClickForwardMuisc(e) {
      this.$store.dispatch('change/updateTrack', {id:this.next})
    },
    // 播放按钮
    handleClickStartPlay(e) {
      commit("change/playing", !this.playing);
    },
    // 切换播放模式
    handleClickTabMode(e) {
      this.mode<2 ? this.mode++ : (this.mode = 0)
    },
    // 静音切换
    handleVolume(e) {
      if(this.volume === 0) {
        this.volume = prevVolume
      } else {
        prevVolume = this.volume
        this.volume = 0
      }
    },
    handleShowList(e) {
      console.log(this.playingList);
    },
    tipFormatter(val) {
      return formatDuring(val * 1000);
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/global";
@import "@/scss/common";

@include slider;
.ant-slider {
  margin: 0;
  padding: 0;
}

.ant-layout-footer {
  background: rgba($color: #fff, $alpha: 1.0);
  color: rgba(0, 0, 0, 0.87);
  position: fixed;
  bottom: 0;
  z-index: 100;
  width: 100%;
  padding: 0;
  .play-control {
    padding: 10px;
    padding-top: 0;
    display: flex;
    justify-content: space-between;
    .playbar-left {
      display: flex;
      flex: 1;
      justify-content: flex-start;
      align-items: center;
      .song-img {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        overflow: hidden;
        .ant-avatar {
          cursor: pointer;
        }
        .ant-btn {
          opacity: 0;
          position: absolute;
          background-color: rgba($color: #000000, $alpha: 0.3);
          border-color: transparent;
          font-size: 1.8rem;
          line-height: 0;
          i {
            line-height: 0;
          }
        }
        &:hover {
          .ant-btn {
            opacity: 1;
          }
        }
      }

      .song-info {
        margin: 0 10px;
        font-size: 0.75rem;
        a,
        span {
          color: #999;
          font-weight: 700;
          font-family: "Roboto", sans-serif !important;
        }
        .song-name {
          font-size: 0.85rem;
          font-weight: 600;
          color: $main-text-color;
        }
        .text-dash {
          margin: 0 5px;
        }
      }
    }

    .playbar-center {
      flex: 2;
      text-align: center;
      .ant-btn {
        border: transparent;
        margin: 0 5px;
        &:hover {
          background-color: rgba($color: #000000, $alpha: 0.03);
        }
        .anticon {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.5rem;
        }
        .p-like,
        .p-activeLike {
          margin-right: 3px;
        }
        .p-play {
          font-size: 1.7rem;
          color: $theme-color;
        }
      }
    }

    .playbar-right {
      display: flex;
      flex: 1;
      justify-content: flex-end;
      align-items: center;
      .ant-btn {
        border: transparent;
        margin: 0 5px;
        &:hover {
          background-color: rgba($color: #000000, $alpha: 0.03);
        }
      }

      .ant-slider {
        width: 7vw;
        margin-top: 7px;
      }
    }
  }
}
</style>
