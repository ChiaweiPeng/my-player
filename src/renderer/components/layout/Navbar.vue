<template>
  <a-menu :default-selected="['1']" theme="light">
    <a-menu-item class="layout-tab" disabled style="cursor: initial" title="Back Forward Fresh">
      <div class="btn-tab">
        <a-button shape="circle" size="small">
          <my-icon type="icon-calendar-arrow-left" />
        </a-button>
        <a-button shape="circle" size="small">
          <my-icon type="icon-calendar-arrow-right" />
        </a-button>
        <a-button shape="circle" size="small">
          <my-icon type="icon-reload" style="fontsize: 1rem; fontwight: 700" />
        </a-button>
      </div>
    </a-menu-item>

    <a-menu-item class="sign-in" disabled style="cursor: initial" title="signin setting mode">
      <a-button
        class="sign"
        type="link"
        style="padding: 0"
        @click="handleSignIn"
      >
        <my-icon type="icon-login-settings" style="marginright: 3px"></my-icon>
        <span>sign-in</span>
      </a-button>

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

    <a-menu-item-group key="1">
      <span slot="title">MUSIC</span>
      <a-menu-item key="1">
        <my-icon class="icon" type="icon-node"></my-icon>
        <span class="item-name">Discover music</span>
      </a-menu-item>

      <a-menu-item key="2">
        <my-icon class="icon" type="icon-song-circle"></my-icon>
        <span class="item-name">Explore</span>
      </a-menu-item>

      <a-menu-item key="3">
        <my-icon class="icon" type="icon-music-node"></my-icon>
        <span class="item-name">Private FM</span>
      </a-menu-item>

      <a-menu-item key="4">
        <my-icon class="icon" type="icon-earphone"></my-icon>
        <span class="item-name">Daily Recommend</span>
      </a-menu-item>
    </a-menu-item-group>

    <a-menu-item-group key="g2">
      <span slot="title">LIBRARY</span>
      <a-menu-item key="5">
        <my-icon class="icon" type="icon-ipod"></my-icon>
        <span class="item-name">My Collection</span>
      </a-menu-item>

      <a-menu-item key="6">
        <my-icon class="icon" type="icon-cdsvg"></my-icon>
        <span class="item-name">My Cloud Disk</span>
      </a-menu-item>

      <a-menu-item key="7">
        <my-icon class="icon" type="icon-radio"></my-icon>
        <span class="item-name">My Radio</span>
      </a-menu-item>
    </a-menu-item-group>
  </a-menu>
</template>

<script>
export default {
  name: "DefaultNavbar",
  data: () => ({
    isNight: false,
  }),
  components: {},
  methods: {
    handleTabNight(e) {
      this.isNight = !this.isNight;
    },
    handleSignIn(e) {
      console.log("sign-in");
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/global";
@import "@/scss/common";
.ant-menu {
  border-right: none;
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
    .ant-btn.sign{
        margin-top: 4px;
        margin-left: 2px;
    }
  }

  .ant-menu-item-group-title span {
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

.ant-menu-inline-collapsed{
    .layout-tab,.sign-in{
        padding: 0 !important;
    }
    .ant-menu-item .anticon{
        line-height: 0;
    }
}
</style>
