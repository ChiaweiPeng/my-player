<template>
  <div class="explore">
    <div class="new-release">
      <p class="light-title">new release</p>
      <p class="main-title">New Albums & EP</p>
      <div class="container">
        <a-row>
          <a-col :span="4">
            <album-cover :album="album" />
          </a-col>
          <a-col :span="4">
            <album-cover :album="album" />
          </a-col>
          <a-col :span="4">
            <album-cover :album="album" />
          </a-col>
          <a-col :span="4">
            <album-cover :album="album" />
          </a-col>
          <a-col :span="4">
            <album-cover :album="album" />
          </a-col>
          <a-col :span="4">
            <album-cover :album="album" />
          </a-col>
        </a-row>
      </div>
    </div>

    <div class="moon">
      <p class="light-title">moon</p>
      <p class="main-title">Moods & Genres</p>
      <div class="container">
        <a-row>
          <a-col :span="4"  v-for="(item,idx) of moon" :key="idx">
              <moon-cover :moon="item" />
          </a-col>
        </a-row>
      </div>
    </div>

    <div class="videos">
      <p class="light-title">videos</p>
      <p class="main-title">New Music Video</p>
      <div class="container">
        <a-row>
          <a-col :span="6">
            <video-cover :video="video" />
          </a-col>
          <a-col :span="6">
            <video-cover :video="video" />
          </a-col>
          <a-col :span="6">
            <video-cover :video="video" />
          </a-col>
          <a-col :span="6">
            <video-cover :video="video" />
          </a-col>
        </a-row>
      </div>
    </div>

    <div class="charts">
      <p class="light-title">charts</p>
      <p class="main-title">Leader Board</p>
      <div class="container">
        <a-row>
          <a-col :span="4">
              <album-cover :album="charts"/>
          </a-col>
          <a-col :span="4">
              <album-cover :album="charts"/>
          </a-col>
          <a-col :span="4">
              <album-cover :album="charts"/>
          </a-col>
          <a-col :span="4">
              <album-cover :album="charts"/>
          </a-col>
          <a-col :span="4">
              <album-cover :album="charts"/>
          </a-col>
          <a-col :span="4">
              <album-cover :album="charts"/>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
import VideoCover from '@/components/default/VideoCover'
import AlbumCover from '@/components/default/AlbumCover'
import MoonCover from '@/components/default/MoonCover'
export default {
  name: "Explore",
  data: () => ({
    album:{
      picUrl: '',
      name: "사랑의 콜센타 PART47",
      link:'/'
    },
    video: {
      picUrl: '',
      title: "彩券",
      artist: "薛之谦",
      num: "637K",
    },
    moon:[
      {name:'综艺', color:'#1890ff'},
      {name:'流行', color:'#1890ff'},
      {name:'影视原声', color:'#1890ff'},
      {name:'综艺', color:'#1890ff'},
      {name:'综艺', color:'#1890ff'},
      {name:'综艺', color:'#1890ff'},
      {name:'综艺', color:'#1890ff'},
      {name:'综艺', color:'#1890ff'}
    ],
    charts:{
      picUrl: '',
      name: '飙升榜',
      link: '/'
    }
  }),
  components: {
    VideoCover,
    AlbumCover,
    MoonCover
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/global";
@import "@/scss/common";
.explore {
  @include theme--light-app;

  .light-title {
    @include content-text-h8;
  }

  .main-title {
    @include content-text-h6;
  }

  .ant-col {
    padding: 12px;
  }

  .moon {
    .moon-type {
      height: 36px;
      line-height: 36px;
      min-width: 64px;
      padding: 0 16px;
      border: 1px solid rgba(0, 0, 0, 0.12);
      border-radius: 6px;
      border-left: 6px solid;
      border-left-color: $theme-color;
      &:hover {
        background: #eaeaea;
        opacity: 0.8;
        transition: 0.4s;
        cursor: pointer;
      }
      .type-name {
        font-size: 0.7rem;
      }
    }
  }
}
</style>
