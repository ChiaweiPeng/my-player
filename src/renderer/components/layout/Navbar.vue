<template>
  <a-layout-sider :trigger="null" collapsible v-model="collapsed" width="250">
    <a-menu :selected-keys="[current]" theme="light" mode="inline" style="width: 250px">
      <a-menu-item
        class="layout-tab"
        disabled
        style="cursor: initial"
        title="Back Forward Fresh"
      >
        <div class="btn-tab">
          <a-button shape="circle" size="small" @click="$router.go(-1)">
            <my-icon type="icon-calendar-arrow-left" />
          </a-button>
          <a-button shape="circle" size="small" @click="$router.go(1)">
            <my-icon type="icon-calendar-arrow-right" />
          </a-button>
          <a-button shape="circle" size="small" @click="handleReload">
            <my-icon
              type="icon-reload"
              style="fontsize: 1rem; fontwight: 700"
            />
          </a-button>
        </div>
      </a-menu-item>

      <a-menu-item
        class="sign-in"
        disabled
        style="cursor: initial"
        title="signin setting mode"
      >
        <default-account :collapsed="collapsed"></default-account>

        <div class="setting">
          <a-button shape="circle" size="small" title="setting">
            <my-icon type="icon-setting-Fill"></my-icon>
          </a-button>

          <a-button
            shape="circle"
            size="small"
            @click="handleTabNight"
            title="tabDayMode"
          >
            <my-icon type="icon-yejian" v-if="!isNight"></my-icon>
            <my-icon type="icon-taiyang1" v-else></my-icon>
          </a-button>
        </div>
      </a-menu-item>

      <a-menu-item-group key="g1">
        <span slot="title">{{ defaultNav1.nav_title }}</span>
        <a-menu-item
          v-for="(item, key) of defaultNav1.nav_item"
          :key="key"
          @click="handleTabContent(key, item.to)"
        >
          <my-icon class="icon" :type="item.icon" />
          <span class="item-name">{{ item.name }}</span>
        </a-menu-item>
      </a-menu-item-group>

      <a-menu-item-group key="g2">
        <span slot="title">{{ defaultNav2.nav_title }}</span>
        <a-menu-item
          v-for="item of defaultNav2.nav_item"
          :key="item.key"
          @click="handleTabContent(item.key, item.to)"
        >
          <my-icon class="icon" :type="item.icon" />
          <span class="item-name">{{ item.name }}</span>
        </a-menu-item>
      </a-menu-item-group>

      <a-menu-item-group key="g3" v-if="logged">
        <a-sub-menu key="sub1">
          <span slot="title"
            ><a-icon type="coffee" /><span>创建的歌单</span></span
          >
          <a-menu-item
            v-for="item of creats"
            :key="item.id"
            @click="handleTabContent(item.id, '')"
          >
            <router-link :to="`/playlist/${item.id}`">
              <my-icon class="icon" type="icon-playlist-music"></my-icon>
              <span class="item-name">{{ item.name }}</span>
            </router-link>
          </a-menu-item>
        </a-sub-menu>

        <a-sub-menu key="sub2">
          <span slot="title"
            ><a-icon type="smile" /><span>收藏的歌单</span></span
          >
          <a-menu-item
            v-for="item of collects"
            :key="item.id"
            @click="handleTabContent(item.id, '')"
          >
            <router-link :to="`/playlist/${item.id}`" :title="item.name">
              <my-icon class="icon" type="icon-playlist-music"></my-icon>
              <span class="item-name">{{ item.name }}</span>
            </router-link>
          </a-menu-item>
        </a-sub-menu>
      </a-menu-item-group>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import DefaultAccount from "@/components/default/Account";
import { sync } from "vuex-pathify";
export default {
  name: "DefaultNavbar",
  data: () => ({
    isNight: false,
    current: 0,
    defaultNav1: {
      nav_title: "音乐",
      nav_item: [
        {
          name: "发现音乐",
          val: "dicover",
          to: "/discover",
          icon: "icon-node",
        },
        {
          name: "探索",
          val: "explore",
          to: "/explore",
          icon: "icon-song-circle",
        },
        { name: "私人FM", val: "fm", to: "/fm", icon: "icon-music-node" },
        {
          name: "每日推荐",
          val: "daily",
          to: "/daily",
          icon: "icon-earphone",
        },
      ],
    },
    defaultNav2: {
      nav_title: "资料库",
      nav_item: [
        {
          key: "4",
          name: "我的收藏",
          val: "collection",
          to: "/collection",
          icon: "icon-ipod",
        },
        {
          key: "5",
          name: "我的云盘",
          val: "disk",
          to: "/cloud-disk",
          icon: "icon-cdsvg",
        },
        {
          key: "6",
          name: "我的电台",
          val: "radio",
          to: "/my-radio",
          icon: "icon-radio",
        },
      ],
    },
    creats: [],
    collects: [],
  }),
  props: {
    collapsed: Boolean,
  },
  components: {
    DefaultAccount,
  },
  computed: {
    logged: (vm) => vm.$store.getters["settings/logged"],
    playlist: sync("change/playlist"),
  },
  created() {
    this.nav();
  },
  methods: {
    handleTabNight(e) {
      this.isNight = !this.isNight;
    },
    handleTabContent(key, link) {
      this.current = key;
      if (link !== "") {
        this.$router.push(link);
      }
    },
    handleReload(e) {
      location.reload();
    },
    titleClick(e) {
      console.log("titleClick", e);
    },
    nav() {
      this.playlist.map((item) => {
        if (item.subscribed === false) {
          this.creats.push(item);
        } else {
          this.collects.push(item);
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/global";
@import "@/scss/common";
.ant-menu {
  border-right: none;
  padding-bottom: 80px;
  .ant-btn {
    border-color: transparent;
    .anticon {
      margin-right: 0;
      font-weight: 600;
    }
  }

  .layout-tab,
  .sign-in {
    margin-bottom: 0;
    display: flex;
    justify-content: space-between;
  }

  .ant-menu-item-group-title span,
  .ant-menu-submenu-title span {
    color: $slider-title-fontcolor;
    font-size: 0.8rem;
    font-weight: 700;
  }

  .ant-menu-item-group-list {
    .ant-menu-item {
      margin: 0;
      margin-bottom: 4px;
      .icon svg {
        color: $theme-color;
        font-size: 0.9rem;
      }
      .item-name {
        font-size: 0.78rem;
        color: $slider-item-fontcolor;
        font-weight: 600;
      }
    }

    .ant-menu-item-selected,
    .ant-menu-item-active {
      .item-name {
        color: $theme-color;
      }
    }
  }
}

.ant-menu-inline-collapsed {
  .layout-tab,
  .sign-in {
    padding: 0 !important;
  }
  .ant-menu-item .anticon {
    line-height: 0;
  }
}

.ant-menu-submenu :global(.ant-menu-submenu-title) {
  padding-left: 22px !important;
  .anticon {
    color: #1890ff;
  }
}
.ant-menu-submenu :global(.ant-menu-item) {
  padding-left: 30px !important;
  a {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover {
    background-color: #e6f7ff;
  }
}
</style>
