<template>
  <div class="search-container">
    <h1 class="main-title">搜索结果:</h1>

    <div class="songs">
      <div class="header">
        <div class="title">歌曲</div>
        <div class="more">
          <a-button type="link" v-show="songs.length > 8" @click="showMoreSongs = !showMoreSongs">
            显示更多
          </a-button>
        </div>
      </div>

      <div class="container">
        <a-row :gutter="[20, 20]">
          <a-col :span="6" v-for="item of songs.slice(0, 8)" :key="item.id">
            <single-bar :song="item"></single-bar>
          </a-col>

          <a-col
            :span="6"
            v-for="item of songs.slice(8, songs.length)"
            :key="item.id"
            v-show="showMoreSongs"
          >
            <single-bar :song="item"></single-bar>
          </a-col>
        </a-row>
      </div>
    </div>

    <div class="artists">
      <div class="header">
        <div class="title">歌手</div>
        <div class="more">
          <a-button type="link" v-show="artists.length > 6" @click="showMoreArt = !showMoreArt"
            >显示更多
          </a-button>
        </div>
      </div>

      <div class="container">
        <a-row :gutter="[12, 12]">
          <a-col :span="4" v-for="item of artists.slice(0,6)" :key="item.id">
            <artist-cover :artist="item"></artist-cover>
          </a-col>

          <a-col
            :span="4"
            v-for="item of artists.slice(6,artists.length)"
            :key="item.id"
            v-show="showMoreArt"
          >
            <artist-cover :artist="item"></artist-cover>
          </a-col>
        </a-row>
      </div>
    </div>

    <div class="albums">
      <div class="header">
        <div class="title">专辑</div>
        <div class="more">
          <a-button 
          type="link"
          v-show="albums.length > 6"
          @click="showMoreAlb = !showMoreAlb"
          >
          显示更多
          </a-button>
        </div>
      </div>

      <div class="container">
        <a-row :gutter="[12, 12]">
          <a-col :span="4" v-for="item of albums.slice(0,6)" :key="item.id">
            <album-cover :data="item" :type="'album'"></album-cover>
          </a-col>

          <a-col :span="4" v-for="item of albums.slice(6,albums.length)" :key="item.id" v-show="showMoreAlb">
            <album-cover :data="item" :type="'album'"></album-cover>
          </a-col>
        </a-row>
      </div>
    </div>

    <div class="playlists">
      <div class="header">
        <div class="title">歌单</div>
        <div class="more">
          <a-button 
          type="link"
          v-show="playlists.length > 6"
          @click="showMorePl = !showMorePl"
          >
          显示更多
          </a-button>
        </div>
      </div>

      <div class="container">
        <a-row :gutter="[12, 12]">
          <a-col :span="4" v-for="item of playlists.slice(0,6)" :key="item.id">
            <album-cover :data="item" :type="'playlist'"></album-cover>
          </a-col>

          <a-col :span="4" v-for="item of playlists.slice(6,playlists.length)" :key="item.id" v-show="showMorePl">
            <album-cover :data="item" :type="'playlist'"></album-cover>
          </a-col>
        </a-row>
      </div>
    </div>

    <div class="mvs">
      <div class="header">
        <div class="title">视频</div>
        <div class="more">
          <a-button 
          type="link"
          v-show="mvs.length>4"
          @click="showMoreMv = !showMoreMv"
          >
          显示更多
          </a-button>
        </div>
      </div>

      <div class="container">
        <a-row :gutter="[12, 12]">
          <a-col :span="6" v-for="item of mvs.slice(0,4)" :key="item.id">
            <video-cover :video="item"></video-cover>
          </a-col>

          <a-col :span="6" v-for="item of mvs.slice(4,mvs.length)" :key="item.id" v-show="showMoreMv">
            <video-cover :video="item"></video-cover>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
import { search } from "@/api/music";
import SingleBar from "@/components/default/SingleBar";
import ArtistCover from "@/components/default/ArtistCover";
import AlbumCover from "@/components/default/AlbumCover";
import VideoCover from "@/components/default/VideoCover";
const TypeMap = {
  song: { type: 1, limit: 32 },
  album: { type: 10, limit: 24 },
  artist: { type: 100, limit: 12 },
  playlist: { type: 1000, limit: 24 },
  mv: { type: 1004, limit: 16 },
};
export default {
  name: "DefaultSearch",
  data: () => ({
    artists: [],
    songs: [],
    albums: [],
    playlists: [],
    mvs: [],
    showMoreSongs: false,
    showMoreArt:false,
    showMoreAlb:false,
    showMorePl:false,
    showMoreMv:false
  }),
  props: {
    keywords: String,
  },
  components: {
    SingleBar,
    ArtistCover,
    AlbumCover,
    VideoCover,
  },
  watch: {
    keywords(val) {
      if (val) {
        this.search();
      }
    },
  },
  created() {
    this.search();
  },
  methods: {
    async search() {
      console.log("key: ", this.keywords);
      const requests = Object.entries(TypeMap).map(([, v]) => {
        return search(this.keywords, { type: v.type, limit: v.limit });
      });
      const [songs, albums, artists, playlists, mvs] = await Promise.all(
        requests
      );

      this.songs = songs ? songs.result.songs : [];
      this.albums = albums ? albums.result.albums : [];
      this.artists = artists ? artists.result.artists : [];
      this.playlists = playlists ? playlists.result.playlists : [];
      this.mvs = mvs ? mvs.result.mvs : [];
    },
    handleMore() {
      this.showMore = !this.showMore;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/common";
.main-title {
  font-weight: 600;
  color:$main-text-color ;
}

.header {
  display: flex;
  justify-content: space-between;
  .title {
    @include content-text-h6;
    font-size: 1.2rem;
  }
  .more {
    .ant-btn {
      font-size: 0.8rem;
      color: #999;
    }
  }
}

.songs .container {
  .ant-col:hover {
    background: $theme-lighten-color;
    cursor: pointer;
  }
}

.songs,
.artists,
.albums,
.playlists,
.mvs {
  padding-bottom: 20px;
}
</style>
