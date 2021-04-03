<template>
  <div class="video-cover">
    <div
      class="video-img"
      :style="`background-image: url('${
        video.picUrl || video.cover ? video.picUrl || video.cover : defaultCover
      }')`"
    >
      <a-button shape="circle"><my-icon type="icon-bofang"></my-icon></a-button>
    </div>

    <div class="video-info">
      <p class="video-title">{{ video.name }}</p>
      <span class="video-artist">{{ video.artistName }} ·</span>
      <span class="video-num">{{ video.playCount }} Views</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoCover',
  data: () => ({
    defaultCover: require('@/assets/default-cover.jpg')
  }),
  props: {
    video: Object
  },
  components: {}
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
  .video-artist {
    color: $theme-color;
  }
}
</style>
