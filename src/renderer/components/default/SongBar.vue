<template>
  <a-menu mode="inline">
    <a-menu-item
      v-for="(song, idx) of playingList"
      :key="idx"
      @click="handleSelect(song.id)"
    >
    <div class="song-img">
        <a-button class="cover"><a-icon type="caret-right" /></a-button>
        <a-avatar shape="square" :src="song.al.picUrl" :size="45"></a-avatar>
    </div>
      <div class="song-info">
        <div class="info">
          <p class="name">{{ song.name }}</p>
          <p class="artist">{{ song.ar[0].name }}</p>
        </div>
        <div class="time">
          {{ formatTime(song.dt) }}
        </div>
      </div>
    </a-menu-item>
  </a-menu>
</template>

<script>
import { mapState } from "vuex";
import { formatDuring } from "@/utils/fn";
export default {
  name: "SongBar",
  data: () => ({}),
  props:{
      playingList: Array
  },
  components: {},
  computed: {
    // ...mapState({
    //   playingList: (state) => state.change.playingList,
    // })
  },
  methods: {
    formatTime(val) {
      return formatDuring(val);
    },
    handleSelect(songId) {
      console.log(songId);
      this.$store.dispatch('change/updateTrack', {id : songId})
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/common";
.ant-menu-inline {
  border-right: none;
  max-height: 70vh;
  overflow: auto;
  .ant-menu-item {
    display: flex;
    height: auto !important;
    margin-bottom: 0 !important;
    padding: 5px 10px !important;
    width: 250px;
    &:hover {
      background-color: $theme-lighten-color;
    }
    .song-img{
        position: relative;
        .cover{
            z-index: 10;
            position: absolute;
            width: 100%;
            height:91%;
            background-color: rgba($color: #000000, $alpha: 0);
            border-color: transparent;
            display: flex;
            justify-content: center;
            i{  
                display: none;
                font-size: 20px;
                margin-left: 8px;
                margin-top: 4px;
            }
            &:hover i{
                display: block;
            }
            &:hover{
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
        width: 100px;
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
}
</style>
