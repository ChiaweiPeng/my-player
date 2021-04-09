<template>
  <div class="explore">
    <div class="new-release">
      <div class="header">
        <div class="title">
          <p class="light-title">new release</p>
          <p class="main-title">新专辑和单曲</p>
        </div>

        <div class="more">
          <a-button type="link">显示更多</a-button>
        </div>
      </div>
      <div class="container">
        <a-row>
          <a-col :span="4" v-for="item of newRelease" :key="item.id">
            <album-cover :data="item" type="album" />
          </a-col>
        </a-row>
      </div>
    </div>

    <div class="moon">
      <div class="header">
        <div class="title">
          <p class="light-title">moon</p>
          <p class="main-title">新专辑和流派</p>
        </div>

        <div class="more">
          <a-button type="link">显示更多</a-button>
        </div>
      </div>

      <div class="container">
        <a-row>
          <a-col :span="4" v-for="item of tags" :key="item.id">
            <moon-cover :moon="item" />
          </a-col>
        </a-row>
      </div>
    </div>

    <div class="videos">
      <div class="header">
        <div class="title">
          <p class="light-title">videos</p>
          <p class="main-title">新到MV</p>
        </div>
        <div class="more">
          <a-button type="link">显示更多</a-button>
        </div>
      </div>

      <div class="container">
        <a-row>
          <a-col :span="6" v-for="item of mvs" :key="item.id">
            <video-cover :video="item" />
          </a-col>
        </a-row>
      </div>
    </div>

    <div class="charts">
      <div class="header">
        <div class="title">
          <p class="light-title">charts</p>
          <p class="main-title">排行榜</p>
        </div>

        <div class="more">
          <a-button type="link">显示更多</a-button>
        </div>
      </div>

      <div class="container">
        <a-row>
          <a-col :span="4" v-for="item of topList" :key="item.id">
            <album-cover :data="item" type="playlist" />
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
import VideoCover from "@/components/default/VideoCover";
import AlbumCover from "@/components/default/AlbumCover";
import MoonCover from "@/components/default/MoonCover";
import { getCatList, newAlbums, getNewMv, getTopList } from "@/api";
import { filter } from "lodash";
export default {
  name: "Explore",
  data: () => ({
    newRelease: [],
    tags: [],
    mvs: [],
    topList: [],
  }),
  components: {
    VideoCover,
    AlbumCover,
    MoonCover,
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const [
        { sub },
        { albums },
        { data: mvs },
        { list: topList },
      ] = await Promise.all([
        getCatList(),
        newAlbums({ limit: 6 }),
        getNewMv({ limit: 4 }),
        getTopList(),
      ]);
      this.tags = sub.slice(0, 18).map((i) => {
        return i;
      });
      this.newRelease = albums;
      this.mvs = mvs;
      this.topList = filter(topList, (i) =>
        [60198, 11641012, 180106, 19723756, 2884035, 5059661515].includes(i.id)
      );
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/global";
@import "@/scss/common";
.header {
  display: flex;
  justify-content: space-between;

  .more {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    .ant-btn {
      font-size: 0.8rem;
      font-weight: 700;
      margin-bottom: 0.6rem;
      color:rgba(0, 0, 0, 0.7)
    }
  }
}

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

  .videos {
    padding: 20px 0;
  }
}
</style>
