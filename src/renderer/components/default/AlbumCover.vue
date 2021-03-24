<template>
  <div class="album-cover">
    <div
      class="album-img"
      :style="`background-image: url('${
        album.picUrl ? album.picUrl : defaultCover
      }`"
    >
      <div class="btn-area">
        <a-button class="al-play" shape="circle"
          ><my-icon type="icon-bofang"></my-icon
        ></a-button>
        <a-button class="al-content" shape="circle"
          ><my-icon type="icon-shenglve"></my-icon
        ></a-button>
      </div>
    </div>
    <p class="album-name">
      <a :href="album.link">{{ album.name }}</a>
    </p>
  </div>
</template>

<script>
export default {
  name: "AlbumCover",
  data: () => ({
    defaultCover: require("@/assets/default-cover.jpg"),
  }),
  props: {
    album: Object,
  },
  components: {},
};
</script>

<style scoped lang="scss">
@import "@/scss/common";
.album-img {
  @include hover-box;
  @include box-btn-area1;
  padding-bottom: 100%;
}

.album-name {
  @include box-title;
  text-align: center;
  a {
    color: $main-text-color;
    border-bottom: 1px solid transparent;
    &:hover {
      border-bottom-color: #43a3fd;
      transition: 0.3s;
    }
  }
}
</style>
