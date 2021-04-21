<template>
  <div class="singlebar" @click="handleSelect(song.id)" :style="`${nightMode? 'color:#999': 'color:'}`">
    <div class="song-img">
      <a-button class="cover"><a-icon type="caret-right" /></a-button>
      <a-avatar shape="square" :src="song.al.picUrl" :size="45"></a-avatar>
    </div>
    <div class="song-info">
      <div class="info" :style="`width:${limitWidth ? '100%' : '100px'}`">
        <p class="name">{{ song.name }}</p>
        <p class="artist">{{ song.ar[0].name }}</p>
      </div>
      <div class="time">
        {{ formatTime(song.dt) }}
      </div>
    </div>
  </div>
</template>

<script>
import { formatDuring } from "@/utils/fn";
import {sync} from 'vuex-pathify'
export default {
  name: "SingleBar",
  data: () => ({}),
  props: {
    song: {
      type: Object,
      default: () => ({}),
    },
    type:String,
    limitWidth:Boolean
  },
  components: {},
  computed:{
    nightMode:sync('myapp/nightMode')
  },
  methods: {
    formatTime(val) {
      return formatDuring(val);
    },
    handleSelect(songId) {
      this.$store.dispatch("change/updateTrack", { id: songId });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/common";
 .singlebar {
    display: flex;
    .song-img {
      position: relative;
      .cover {
        z-index: 10;
        position: absolute;
        width: 100%;
        height: 91%;
        background-color: rgba($color: #000000, $alpha: 0);
        border-color: transparent;
        display: flex;
        justify-content: center;
        i {
          display: none;
          font-size: 20px;
          margin-left: 5px;
          margin-top: 3px;
        }
        &:hover i {
          display: block;
        }
        &:hover {
          background-color: rgba($color: #000000, $alpha: 0.3);
        }
      }
    }
    .song-info {
      display: flex;
      flex: 1;
      justify-content: space-between;
      align-items: center;
      padding-left: 15px;
      font-size: 0.8rem;
      .info {
        // width: 100px;
        p {
          margin: 0;
          line-height: 25px;
          @include letter-overflow;
        }
        .name {
          //   color: $theme-color;
          font-weight: 600;
        }
        .artist {
          font-size: 0.7rem;
        }
      }
      .time {
        font-size: 0.7rem;
      }
    }
  }
</style>
