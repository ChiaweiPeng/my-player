<template>
  <div class="playlist-container">
    <div class="info-container">
      <div class="left">
        <album-cover :data="list" :type="type" :showTitle="false"></album-cover>
      </div>
      <div class="right">
        <p class="playlist-title">{{ list.name }}</p>
        <div class="playlist-message">
          <p v-if="type === 'playlist'">
            歌单来自：
            <router-link :to="`/artist/${$ochain(list, 'creator','userId')}`">
              {{ $ochain(list, 'creator', 'nickname') }}
            </router-link>
          </p>

          <p v-if="type === 'album'">
            专辑作者：
            <router-link :to="`/artist/${$ochain(list,'artist','id')}`">
              {{ $ochain(list,'artist','name') }}
            </router-link>
          </p>

          <p v-if="type === 'album'">
            更新时间：
            {{
              $dayjs(list.publishTime).format("YYYY-MM-DD")
            }}
            · {{ list.size }} 首歌曲
          </p>

          <p v-if="type === 'playlist'">
            更新时间：
            {{
              $dayjs(list.updateTime).format("YYYY-MM-DD")
            }}
            · {{ count }} 次播放
          </p>
        </div>
        <p class="playlist-info">{{ list.description }}</p>
        <a-button @click="handlePlay">
          <my-icon type="icon-bofang"></my-icon>
          播放
        </a-button>
      </div>
    </div>

    <div class="songs-container">
      <song-bar
        :playingList="list.tracks"
        :maxHeight="true"
        :limitWidth="true"
      ></song-bar>
    </div>
  </div>
</template>

<script>
import { getPlayList, getAlbum } from "@/api";
import AlbumCover from "@/components/default/AlbumCover";
import SongBar from "@/components/default/SongBar";
import { dispatch } from "vuex-pathify";
import {formatNumber} from "@/utils/fn"
export default {
  name: "List",
  data: () => ({
    list: {
      tracks: [],
      songs: [],
      coverImgUrl: "",
      name: "",
      description: "",
    },
  }),
  components: {
    AlbumCover,
    SongBar,
  },
  props: {
    id: {
      type: String,
      default: 1,
    },
    type: {
      type: String,
      default: "",
    },
  },
  watch: {
    id() {
      this.fetch();
    },
  },
  created() {
    this.fetch();
  },
  mounted() {},
  computed: {
    service: (vm) => (vm.type === "album" ? getAlbum : getPlayList),
    count(){
      if(this.list.playCount){
        return formatNumber(this.list.playCount)
      }
    }
  },
  methods: {
    async fetch() {
      console.log(this.type);
      this.list = {};
      const { album, songs, playlist } = await this.service(this.id);
      if (this.type === "album") {
        this.list = album;
        this.list.tracks = songs;
      } else {
        this.list = playlist;
      }
      // console.log(this.list)
    },
    async handlePlay() {
      await dispatch("change/updatePlayingList", this.list.tracks);
      await dispatch("change/updateTrack", { id: this.list.tracks[0].id });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/common";
.info-container {
  display: flex;
  margin-bottom: 30px;
  .left {
    flex: 0 0 22%;
  }
  .right {
    margin-left: 20px;
    .playlist-title {
      @include content-text-h6;
    }
    .playlist-info {
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 5;
    }
  }
}
</style>
