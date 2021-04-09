<template>
  <div class="collection-container">
    <div class="recent">
      <div class="header">
        <div class="subtitle">近期</div>
        <div class="title">最近播放</div>
      </div>

      <div class="recent-container">
        <a-row :gutter="[60, 30]">
          <a-col :span="6" v-for="(song, idx) of recent" :key="idx">
            <single-bar :song="song"></single-bar>
          </a-col>
        </a-row>
      </div>
    </div>

    <div class="tab-container">
      <div class="header">
        <div class="title">我的收藏</div>
      </div>
      <a-tabs default-active-key="0" @change="loadData">
        <a-tab-pane key="0" tab="歌单">
          <a-row :gutter="[30, 30]">
            <a-col :span="4" v-for="pl of playlist" :key="pl.id">
              <album-cover :data="pl" :type="'playlist'"></album-cover>
            </a-col>
          </a-row>
        </a-tab-pane>

        <a-tab-pane key="1" tab="专辑">
          <a-row :gutter="[30, 30]">
            <a-col :span="4" v-for="al of albums" :key="al.id">
              <album-cover :data="al" :type="'album'"></album-cover>
            </a-col>
          </a-row>
        </a-tab-pane>

        <a-tab-pane key="2" tab="歌手">
          <a-row :gutter="[20, 20]">
            <a-col :span="4" v-for="art of artists" :key="art.id">
              <artist-cover :artist="art"></artist-cover>
            </a-col>
          </a-row>
        </a-tab-pane>

        <a-tab-pane key="3" tab="MV">
          <a-row :gutter="[30, 30]">
            <a-col :span="6" v-for="mv of mvs" :key="mv.id">
              <video-cover :video="mv"></video-cover>
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import { sync, get } from "vuex-pathify";
import { getUserPlaylist, favAlbums, favMVs, favArtists } from "@/api/user";
import { getSongData } from "@/api";
import SingleBar from "@/components/default/SingleBar";
import AlbumCover from "@/components/default/AlbumCover";
import VideoCover from "@/components/default/VideoCover";
import ArtistCover from "@/components/default/ArtistCover";
export default {
  name: "Collection",
  data: () => ({
    recent: [],
    tab: 0,
    albums: [],
    mvs: [],
    artists: [],
  }),
  components: {
    SingleBar,
    AlbumCover,
    VideoCover,
    ArtistCover,
  },
  computed: {
    playlist: sync("change/playlist"),
    recentIds: get("change/recent"),
    type() {
      return {
        0: "playlists",
        1: "albums",
        2: "artists",
        3: "mvs",
      }[this.tab];
    },
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const { songs } = await getSongData(this.recentIds.slice(0, 16));
      this.recent = songs;
    },
    loadData(key) {
      this.tab = key;
      this.$nextTick(async () => {
        if (this.type === "albums" && !this.albums.length) {
          const { data } = await favAlbums();
          this.albums = data;
        } else if (this.type === "artists" && !this.artists.length) {
          const { data } = await favArtists();
          this.artists = data;
        } else if (this.type === "mvs" && !this.mvs.length) {
          const { data } = await favMVs();
          this.mvs = data;
        } else if (this.type === "playlists" && !this.playlist.length) {
          console.log("31111");
          const { playlist } = await getUserPlaylist();
          console.log(playlist);
          this.playlist = playlist;
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/common";
.recent {
  margin-bottom: 20px;
  .header {
    margin-bottom: 20px;
    .subtitle {
      @include content-text-h8;
      margin-bottom: 5px;
    }
    .title {
      @include content-text-h6;
    }
  }

  .recent-container {
    cursor: pointer;
    .ant-col {
      border-radius: 5px;
      &:hover {
        background-color: $theme-lighten-color;
      }
    }
  }
}

.tab-container {
    .header {
      margin-top: 35px;
      .title {
        @include content-text-h6;
      }
    }
  }
</style>
