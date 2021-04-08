<template>
  <div class="artist-container">
    <div class="avatar-container">
      <a-avatar
        class="artist-avatar"
        :size="190"
        :src="artist.img1v1Url"
      ></a-avatar>
      <h1 class="artist-name">{{ artist.name }}</h1>
      <p class="artist-info">{{ artist.briefDesc }}</p>
    </div>

    <div class="artist-new">
      <div class="new-album">
        <p class="title">最新发布</p>
        <album-cover :data="latest"></album-cover>
      </div>
      <div class="new-song">
        <div class="header">
          <p class="title">热门歌曲</p>
          <a-button
            v-show="hotSongs.length > 6"
            small
            type="link"
            @click="showMoreSong = !showMoreSong"
          >
            显示更多
          </a-button>
        </div>
        <a-row :gutter="[30, 30]">
          <a-col
            :span="12"
            v-for="track of hotSongs.slice(0, 6)"
            :key="track.id"
          >
            <single-bar :song="track"></single-bar>
          </a-col>

          <a-col
            :span="12"
            v-for="track of hotSongs.slice(6, hotSongs.length)"
            :key="track.id"
            v-show="showMoreSong"
          >
            <single-bar :song="track"></single-bar>
          </a-col>
        </a-row>
      </div>
    </div>

    <div class="artist-album">
      <div class="header">
        <p class="title">专辑</p>
        <a-button
          v-show="albums.length > 6"
          small
          type="link"
          @click="showMoreAlbum = !showMoreAlbum"
        >
          显示更多
        </a-button>
      </div>

      <div class="container">
        <a-row :gutter="[16, 16]">
          <a-col :span="4" v-for="item of albums.slice(0, 6)" :key="item.id">
            <album-cover :data="item"></album-cover>
          </a-col>

          <a-col
            :span="4"
            v-show="showMoreAlbum"
            v-for="item of albums.slice(6, albums.length)"
            :key="item.id"
          >
            <album-cover :data="item"></album-cover>
          </a-col>
        </a-row>
      </div>
    </div>

    <div class="artist-songs">
      <div class="header">
        <p class="title">单曲与EP</p>
        <a-button
          v-show="epAndSingle.length > 6"
          small
          type="link"
          @click="showMoreEps = !showMoreEps"
        >
          显示更多
        </a-button>
      </div>

      <div class="container">
        <a-row :gutter="[16, 16]">
          <a-col
            :span="4"
            v-for="item of epAndSingle.slice(0, 6)"
            :key="item.id"
          >
            <album-cover :data="item"></album-cover>
          </a-col>

          <a-col
            v-show="showMoreEps"
            :span="4"
            v-for="item of epAndSingle.slice(6, epAndSingle.length)"
            :key="item.id"
          >
            <album-cover :data="item"></album-cover>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
import { getArtist, getArtistAlbum } from "@/api";
import AlbumCover from "@/components/default/AlbumCover";
import SingleBar from "@/components/default/SingleBar";
export default {
  name: "Artist",
  data: () => ({
    artist: {},
    hotSongs: [],
    hotAlbums: [],
    showMoreSong: false,
    showMoreAlbum: false,
    showMoreEps: false,
  }),
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  components: {
    AlbumCover,
    SingleBar,
  },
  computed: {
    latest() {
      return this.albums[0];
    },
    albums() {
      return this.hotAlbums.filter((a) => a.type === "专辑");
    },
    epAndSingle() {
      return this.hotAlbums.filter((a) =>
        ["EP/Single", "EP", "Single"].includes(a.type)
      );
    },
  },
  watch: {
    id() {
      this.load();
    },
  },
  created() {
    this.load();
  },
  methods: {
    async load() {
      const [artist, album] = await Promise.all([
        getArtist(this.id),
        getArtistAlbum(this.id),
      ]);
      this.artist = artist.artist;
      this.hotSongs = artist.hotSongs;
      this.hotAlbums = album.hotAlbums;
      console.log(this.hotSongs.slice(0, 6));
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/common";
.ant-col :global(button > .anticon) {
  margin-top: 3px !important;
  margin-left: 3px !important;
}
.title {
  @include content-text-h6;
}

.header {
  display: flex;
  justify-content: space-between;

  .more {
    color: $theme-color;
    cursor: pointer;
    font-size: 0.8rem;
  }
}

.avatar-container {
  text-align: center;
  .artist-name {
    font-size: 1.6rem;
    margin-top: 20px;
    font-weight: 700;
  }
  .artist-info {
    width: 80%;
    margin: auto;
    color: $slider-title-fontcolor;
  }
}

.artist-new {
  display: flex;
  margin-top: 30px;
  .new-album {
    flex: 0 0 20%;
    max-width: 20%;
  }
  .new-song {
    flex: 0 0 80%;
    padding-left: 30px;
    .ant-row {
      padding-top: 20px;
      .ant-col {
        cursor: pointer;
        &:hover {
          background-color: $theme-lighten-color;
        }
      }
    }
  }
}
.artist-new,
.artist-album,
.artist-songs {
  padding-bottom: 30px;
}
</style>
