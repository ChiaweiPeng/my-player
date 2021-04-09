<template>
  <div class="video-cover">
    <router-link :to="`/musicvideo/${video.id}`">
      <div
        class="video-img"
        :style="`background-image: url('${imgUrl}')`"
      >
        <a-button shape="circle"
          ><my-icon type="icon-bofang"></my-icon
        ></a-button>
      </div>
    </router-link>

    <div class="video-info">
      <p class="video-title">{{ video.name || video.title }}</p>
      <router-link class="video-artist" :to="'/artist/' + video.artistId || video.creator[0].userId">{{ video.artistName || video.creator[0].userName}}</router-link> · 
      <span class="video-num">{{ count }} Views</span>
    </div>
  </div>
</template>

<script>
import {formatNumber} from '@/utils/fn'
export default {
  name: 'VideoCover',
  data: () => ({
    defaultCover: require('@/assets/default-cover.jpg')
  }),
  props: {
    video: Object
  },
  components: {},
  computed:{
    imgUrl(){
      if(this.video.picUrl || this.video.cover){
        return this.video.picUrl || this.video.cover
      } else if (this.video.coverUrl) {
        return this.video.coverUrl
      } else {
        return defaultCover
      }
    },
    count(){
      return formatNumber(this.video.playCount || this.video.playTime)
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
@import "@/scss/common";
.video-img {
  @include box-btn-area2;
}
.video-info {
  font-size: 0.78rem;
  font-weight: 600;
  .video-title {
    @include box-title;
  }
  // .video-artist {
  //   color: $theme-color;
  // }
}
</style>
