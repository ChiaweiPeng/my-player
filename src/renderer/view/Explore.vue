<template>
  <div class="explore">
    <div class="new-release">
      <p class="light-title">new release</p>
      <p class="main-title">New Albums & EP</p>
      <div class="container">
        <a-row>
          <a-col :span="4">
            <div
              class="ban-img"
              :style="`background-image: url('${ban.picUrl}`"
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
            <p class="ban-name"><a href="">사랑의 콜센타 PART47</a></p>
          </a-col>

          <a-col :span="4">
            <div
              class="ban-img"
              :style="`background-image: url('${ban.picUrl}`"
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
            <p class="ban-name"><a href="">사랑의 콜센타 PART47</a></p>
          </a-col>

          <a-col :span="4">
            <div
              class="ban-img"
              :style="`background-image: url('${ban.picUrl}`"
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
            <p class="ban-name"><a href="">사랑의 콜센타 PART47</a></p>
          </a-col>

          <a-col :span="4">
            <div
              class="ban-img"
              :style="`background-image: url('${ban.picUrl}`"
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
            <p class="ban-name"><a href="">사랑의 콜센타 PART47</a></p>
          </a-col>

          <a-col :span="4">
            <div
              class="ban-img"
              :style="`background-image: url('${ban.picUrl}`"
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
            <p class="ban-name"><a href="">사랑의 콜센타 PART47</a></p>
          </a-col>

          <a-col :span="4">
            <div
              class="ban-img"
              :style="`background-image: url('${ban.picUrl}`"
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
            <p class="ban-name"><a href="">사랑의 콜센타 PART47</a></p>
          </a-col>
        </a-row>
      </div>
    </div>

    <div class="moon">
      <p class="light-title">moon</p>
      <p class="main-title">Moods & Genres</p>
      <div class="container">
        <a-row>
          <a-col :span="4">
            <div class="moon-type">
              <span class="type-name">综艺</span>
            </div>
          </a-col>

          <a-col :span="4">
            <div class="moon-type">
              <span class="type-name">综艺</span>
            </div>
          </a-col>

          <a-col :span="4">
            <div class="moon-type">
              <span class="type-name">综艺</span>
            </div>
          </a-col>

          <a-col :span="4">
            <div class="moon-type">
              <span class="type-name">综艺</span>
            </div>
          </a-col>

          <a-col :span="4">
            <div class="moon-type">
              <span class="type-name">综艺</span>
            </div>
          </a-col>

          <a-col :span="4">
            <div class="moon-type">
              <span class="type-name">综艺</span>
            </div>
          </a-col>

          <a-col :span="4">
            <div class="moon-type">
              <span class="type-name">综艺</span>
            </div>
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
            <div
              class="videos-img"
              :style="`background-image: url('${videos.picUrl}')`"
            >
              <a-button shape="circle"
                ><my-icon type="icon-bofang"></my-icon
              ></a-button>
            </div>
            <div class="videos-info">
              <p class="videos-title">{{ videos.title }}</p>
              <span class="videos-artist">{{ videos.artist }} ·</span>
              <span class="videos-num">{{ videos.num }} Views</span>
            </div>
          </a-col>

          <a-col :span="6">
            <div
              class="videos-img"
              :style="`background-image: url('${videos.picUrl}')`"
            >
              <a-button shape="circle"
                ><my-icon type="icon-bofang"></my-icon
              ></a-button>
            </div>
            <div class="videos-info">
              <p class="videos-title">{{ videos.title }}</p>
              <span class="videos-artist">{{ videos.artist }} ·</span>
              <span class="videos-num">{{ videos.num }} Views</span>
            </div>
          </a-col>

          <a-col :span="6">
            <div
              class="videos-img"
              :style="`background-image: url('${videos.picUrl}')`"
            >
              <a-button shape="circle"
                ><my-icon type="icon-bofang"></my-icon
              ></a-button>
            </div>
            <div class="videos-info">
              <p class="videos-title">{{ videos.title }}</p>
              <span class="videos-artist">{{ videos.artist }} ·</span>
              <span class="videos-num">{{ videos.num }} Views</span>
            </div>
          </a-col>

          <a-col :span="6">
            <div
              class="videos-img"
              :style="`background-image: url('${videos.picUrl}')`"
            >
              <a-button shape="circle"
                ><my-icon type="icon-bofang"></my-icon
              ></a-button>
            </div>
            <div class="videos-info">
              <p class="videos-title">{{ videos.title }}</p>
              <span class="videos-artist">{{ videos.artist }} ·</span>
              <span class="videos-num">{{ videos.num }} Views</span>
            </div>
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
            <div
              class="charts-img"
              :style="`background-image: url('${charts.picUrl}`"
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
            <p class="charts-name"><a href="">飙升榜</a></p>
          </a-col>

          <a-col :span="4">
            <div
              class="charts-img"
              :style="`background-image: url('${charts.picUrl}`"
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
            <p class="charts-name"><a href="">飙升榜</a></p>
          </a-col>

          <a-col :span="4">
            <div
              class="charts-img"
              :style="`background-image: url('${charts.picUrl}`"
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
            <p class="charts-name"><a href="">飙升榜</a></p>
          </a-col>

          <a-col :span="4">
            <div
              class="charts-img"
              :style="`background-image: url('${charts.picUrl}`"
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
            <p class="charts-name"><a href="">飙升榜</a></p>
          </a-col>

          <a-col :span="4">
            <div
              class="charts-img"
              :style="`background-image: url('${charts.picUrl}`"
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
            <p class="charts-name"><a href="">飙升榜</a></p>
          </a-col>

          <a-col :span="4">
            <div
              class="charts-img"
              :style="`background-image: url('${charts.picUrl}`"
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
            <p class="charts-name"><a href="">飙升榜</a></p>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Explore",
  data: () => ({
    ban: {
      picUrl: require("@/assets/default-cover.jpg"),
    },
    videos: {
      picUrl: require("@/assets/default-cover.jpg"),
      title: "彩券",
      artist: "薛之谦",
      num: "637K",
    },
    charts:{
      picUrl:require("@/assets/default-cover.jpg"),
    }
  }),
  components: {},
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

  .new-release,.charts {
    .ban-img,.charts-img {
      @include hover-box;
      @include box-btn-area1;
      padding-bottom: 100%;
    }

    .ban-name,.charts-name {
      @include box-title;
      text-align: center;
      a {
        color: $main-text-color;
      }
    }

    .charts-name{
      text-align: left;
    }
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
    .videos-img {
      @include box-btn-area2;
    }
    .videos-info {
      font-size: 0.78rem;
      font-weight: 600;
      .videos-title {
        @include box-title;
      }
      .videos-artist {
        color: $theme-color;
      }
    }
  }
}
</style>
