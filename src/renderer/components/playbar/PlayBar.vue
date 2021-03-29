<template>
  <a-layout-footer>
    <div class="play-progress">
      <!-- <a-progress :percent="percent" :showInfo="false" :strokeLinecap="square"/> -->
      <a-slider
        @afterChange="onAfterPlaybarChange"
        v-model="playProgress"
      ></a-slider>
    </div>
    <div class="play-control">
      <div class="playbar-left">
        <div class="song-img">
          <a-avatar
            shape="square"
            :size="40"
            :src="require(`@/assets/default-cover.jpg`)"
          />
          <a-button type="square" size="large" class="tab-big">
            <my-icon type="icon-zhankai"></my-icon>
          </a-button>
        </div>

        <div class="song-info">
          <a href="" class="song-name">提坎库如克</a>
          <span class="text-dash">-</span>
          <a href="" class="song-artist">霓虹花园</a>
        </div>
      </div>
      <div class="playbar-center">
        <a-button shape="circle" size="large" @click="handleClickLike">
          <my-icon
            class="p-like"
            type="icon-1_music90"
            v-show="!playbarMode.activeLike"
          ></my-icon>
          <my-icon
            class="p-activeLike"
            type="icon-1_music90-copy"
            v-show="playbarMode.activeLike"
          ></my-icon>
        </a-button>

        <a-button shape="circle" size="large" @click="handleClickBackMusic"
          ><my-icon class="p-back" type="icon-1_music83"></my-icon
        ></a-button>

        <a-button shape="circle" size="large" @click="handleClickStartPlay">
          <my-icon
            class="p-play"
            type="icon-bofang"
            v-show="!playbarMode.isPlaying"
          ></my-icon>
          <my-icon
            class="p-stop"
            type="icon-zanting-copy"
            v-show="playbarMode.isPlaying"
          ></my-icon>
        </a-button>

        <a-button shape="circle" size="large" @click="handleClickForwardMuisc"
          ><my-icon class="p-forward" type="icon-1_music82"></my-icon
        ></a-button>

        <a-button shape="circle" size="large" @click="handleClickTabMode">
          <my-icon
            class="p-mode-list"
            type="icon-1_music84"
            v-show="playbarMode.cycleMode.listCycle"
          ></my-icon>
          <my-icon
            class="p-mode-random"
            type="icon-1_music85"
            v-show="playbarMode.cycleMode.randomCycle"
          ></my-icon>
          <my-icon
            class="p-mode-one"
            type="icon-danquxunhuan"
            v-show="playbarMode.cycleMode.oneCycle"
          ></my-icon>
        </a-button>
      </div>
      <div class="playbar-right">
        <a-button shape="circle" size="large" @click="handleVolume">
          <my-icon
            class="p-vol-open"
            type="icon-yinliangdayinliangda"
            v-show="!playbarMode.muteVolume"
          ></my-icon>
          <my-icon
            class="p-vol-close"
            type="icon-yinliangxiaoyinliangxiao"
            v-show="playbarMode.muteVolume"
          ></my-icon>
        </a-button>
        <div class="volume-track">
          <a-slider
            @afterChange="onAfterVolumeChange"
            v-model="volumeProgress"
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
export default {
  name: 'DefaultPlaybar',
  data: () => ({
    playProgress: 10,
    volumeProgress: 20,
    playbarMode: {
      activeLike: false,
      isPlaying: false,
      cycleMode: {
        listCycle: false,
        randomCycle: true,
        oneCycle: false
      },
      muteVolume: false
    }
  }),
  components: {},
  methods: {
    onAfterPlaybarChange (val) {
      console.log('onAfterPlaybarChange:' + val)
      console.log('progress:' + this.playProgress)
    },
    onAfterVolumeChange (val) {
      console.log('onAfterVolumeChange:' + val)
      console.log('progress:' + this.volumeProgress)
    },
    handleClickLike (e) {
      this.playbarMode.activeLike = !this.playbarMode.activeLike
    },
    handleClickBackMusic (e) {
      console.log('backmusic')
    },
    handleClickForwardMuisc (e) {
      console.log('forwardMusic')
    },
    handleClickStartPlay (e) {
      this.playbarMode.isPlaying = !this.playbarMode.isPlaying
    },
    handleClickTabMode (e) {
      console.log('aa')
    },
    handleVolume (e) {
      this.playbarMode.muteVolume = !this.playbarMode.muteVolume
      if (this.playbarMode.muteVolume) {
        this.volumeProgress = 0
      }
    },
    handleShowList (e) {
      console.log('song list')
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/scss/global";
@import "@/scss/common";
.ant-slider :global(.ant-slider-handle) {
  display: none;
}
.ant-slider:hover :global(.ant-slider-handle) {
  display: block;
}

.ant-slider{
  margin: 0;
  padding: 0
}

.ant-layout-footer {
  @include theme--light-app;
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
          margin-left: 4px;
          color: $theme-color;
        }
        .p-stop {
          font-size: 1.7rem;
        }
        .p-mode-one {
          font-size: 1.3rem;
        }
      }
    }

    .playbar-right {
      display: flex;
      justify-content: center;
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

      .p-vol-close {
        margin-right: 4px;
      }
    }
  }
}
</style>
