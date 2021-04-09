<template>
  <div class="artist-cover">
    <router-link :to="`/artist/${artist.id}`">
      <div class="art-img">
        <a-avatar
          :src="artist.img1v1Url || artist.picUrl"
          shape="circle"
          :size="130"
        ></a-avatar>
        <a-button class="al-play" shape="circle" ghost
          ><my-icon type="icon-bofang"></my-icon
        ></a-button>
      </div>
    </router-link>

    <p class="art-name">
      <router-link :to="`/artist/${artist.id}`">{{ artist.name }}</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: "ArtistCover",
  data: () => ({}),
  props: {
    artist: Object,
  },
  components: {},
};
</script>

<style scoped lang="scss">
@import "@/scss/common";
.artist-cover {
  display: flex;
  flex-direction: column;
  align-items: center;
  .art-img {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    .al-play {
      position: absolute;
      width: 100%;
      height: 100%;
      border-color: transparent;
      background-color: rgba($color: #000000, $alpha: 0);
      .anticon {
        display: none;
        font-size: 2rem;
        margin-top: 5px;
        margin-left: 4px;
      }
      &:hover {
        border-color: transparent;
        background-color: rgba($color: #000000, $alpha: 0.3) !important;
        .anticon {
          display: block;
        }
      }
    }
  }
  .art-name {
    margin-top: 10px;
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
}
</style>