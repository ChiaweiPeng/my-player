<template>
  <div class="daily-container">
    <div class="header">
      <div class="img">
        <a-avatar
          :size="250"
          :src="$ochain(firstSong, 'al', 'picUrl')"
          shape="square"
        ></a-avatar>
        <a-button class="daily-play" @click="handleDailyPlay"><my-icon type="icon-bofang"></my-icon></a-button>
      </div>
      <div class="info">
        <div class="time">{{ $dayjs().format("YYYY/MM/DD") }}</div>
        <div class="title">每日推荐</div>
      </div>
    </div>

    <div class="song-container">
      <song-bar :playingList="daily" :maxHeight="true"></song-bar>
    </div>
  </div>
</template>

<script>
import SongBar from "@/components/default/SongBar";
import { getDailyRecommend } from "@/api";
import {dispatch} from 'vuex-pathify'
export default {
  name: "Daily",
  data: () => ({
    daily: [],
    firstSong: {},
  }),
  components: {
    SongBar,
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const { data } = await getDailyRecommend();
      if (data) {
        this.daily = data.dailySongs;
        // console.log(this.daily[0])
        this.firstSong = this.daily[0];
      }
    },
    async handleDailyPlay(){
      await this.$store.dispatch('change/updatePlayingList', this.daily)
      await this.$store.dispatch('change/updateTrack',{id:this.firstSong.id})
    }
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/common";
.daily-container{
    display: flex;
}
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  .img{
      @include hover-box;
      width:auto;
      padding-bottom: 0;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      .daily-play{
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba($color: #000000, $alpha: 0);
        &:hover{
          background-color: rgba($color: #000000, $alpha: .3);
        }
        .anticon{
          font-size: 4rem;
          margin-top: 10px;
          margin-left: 5px;
        }
      }
  }
  .info {
    display: flex;
    flex-direction: column;
    align-items: center;
    .time {
      @include content-text-h8;
      font-size: 1.3rem;
      color:$theme-color;
      margin-top: 10px;
      margin-bottom: 5px
    }
    .title {
      @include content-text-h6;
      font-size: 1.5rem;
    }
  }
}
.song-container{
    flex: 1;
    height: 80vh;
    overflow: auto;
}
</style>
