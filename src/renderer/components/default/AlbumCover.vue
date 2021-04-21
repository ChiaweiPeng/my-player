<template>
  <div class="album-cover">
    <router-link :to="to">
      <div class="album-img" :style="`background-image: url('${coverBgUrl}')`">
        <div class="btn-area">
          <a-button class="al-play" shape="circle" @click="play"
            ><my-icon type="icon-bofang"></my-icon
          ></a-button>

          <a-popover title="播放列表" trigger="click" placement="leftBottom">
            <template slot="content">
              <song-bar
                :playingList="playingList"
                :overflow="'auto'"
              ></song-bar>
            </template>
            <a-button class="al-content" shape="circle" @click="handleShowList">
              <my-icon type="icon-shenglve"></my-icon>
            </a-button>
          </a-popover>
        </div>
      </div>
    </router-link>

    <p class="album-name" v-if="showTitle">
      <router-link :to="to">{{ data.name }}</router-link>
    </p>
  </div>
</template>

<script>
import { getPlayList, getAlbum, getArtist } from "@/api";
import { dispatch, sync } from "vuex-pathify";
import SongBar from "./SongBar";
import { mapState } from "vuex";
export default {
  name: "AlbumCover",
  data: () => ({
    // defaultCover: require("@/assets/default-cover.jpg"),
    playingList: [],
  }),
  props: {
    data: {
      type: Object,
      default: () => ({
        id: 3117618863,
        name: "所以你并没有坚定选择过我.",
        copywriter: "热门推荐",
        picUrl:
          "https://p1.music.126.net/6mnrODz-pMVBq8UReZqfLA==/109951165533152791.jpg",
      }),
    },
    type: {
      type: String,
      default: "album",
    },
    showTitle: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    SongBar,
  },
  computed: {
    coverBgUrl() {
      return this.data.picUrl ? this.data.picUrl : this.data.coverImgUrl;
    },
    service() {
      return {
        album: getAlbum,
        playlist: getPlayList,
      }[this.type];
    },
    to() {
      return {
        album: `/album/${this.data.id}`,
        playlist: `/playlist/${this.data.id}`,
      }[this.type];
    },
    showList: sync("myapp/showList"),
  },
  methods: {
    async play() {
      const data = await this.service(this.data.id);
      let list = [];
      if (this.type === "album") {
        list = data.songs;
      } else if (this.type === "playlist") {
        list = data.playlist.tracks;
      } else {
        list = data.list;
      }
      await this.$store.dispatch("change/updatePlayingList", list);
      await this.$store.dispatch("change/updateTrack", { id: list[0].id });
    },
    async handleShowList() {
      this.showList = !this.showList;

      const data = await this.service(this.data.id);
      let list = [];
      if (this.type === "album") {
        list = data.songs;
      } else if (this.type === "playlist") {
        list = data.playlist.tracks;
      } else {
        list = data.list;
      }

      this.playingList = list;
      // console.log(this.playingList);
    },
  },
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
