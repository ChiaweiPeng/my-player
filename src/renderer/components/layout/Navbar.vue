<template>
  <a-layout-sider :trigger="null" collapsible v-model="collapsed" >
    <a-menu :selected-keys="[current]" theme="light">
      <a-menu-item
        class="layout-tab"
        disabled
        style="cursor: initial"
        title="Back Forward Fresh"
      >
        <div class="btn-tab">
          <a-button shape="circle" size="small">
            <my-icon type="icon-calendar-arrow-left" />
          </a-button>
          <a-button shape="circle" size="small">
            <my-icon type="icon-calendar-arrow-right" />
          </a-button>
          <a-button shape="circle" size="small">
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
        <a-button
          class="sign"
          type="link"
          style="padding: 0"
          @click="handleSignIn"
        >
          <my-icon
            type="icon-login-settings"
            style="marginright: 3px"
          ></my-icon>
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

      <a-menu-item-group key="g1">
        <span slot="title">{{defaultNav1.nav_title}}</span>
        <a-menu-item v-for="(item,key) of defaultNav1.nav_item" :key="key" @click="handleTabContent(key,item.to)">
          <my-icon class="icon" :type="item.icon" />
          <span class="item-name">{{item.name}}</span>
        </a-menu-item>
      </a-menu-item-group>

      <a-menu-item-group key="g2">
        <span slot="title">{{defaultNav2.nav_title}}</span>
        <a-menu-item v-for="item of defaultNav2.nav_item" :key="item.key" @click="handleTabContent(item.key,item.to)">
          <my-icon class="icon" :type="item.icon" />
          <span class="item-name">{{item.name}}</span>
        </a-menu-item>
      </a-menu-item-group>
    </a-menu>
  </a-layout-sider>
</template>

<script>
export default {
  name: 'DefaultNavbar',
  data: () => ({
    isNight: false,
    current: 0,
    defaultNav1: {
      nav_title: 'MUSIC',
      nav_item: [
        {name: 'Discover music', val: 'dicover', to: '/discover', icon: 'icon-node'},
        {name: 'Explore', val: 'explore', to: '/explore', icon: 'icon-song-circle'},
        {name: 'Private FM', val: 'fm', to: '/fm', icon: 'icon-music-node'},
        {name: 'Daily Recommend', val: 'recommend', to: '/recommend', icon: 'icon-earphone'}
      ]
    },
    defaultNav2: {
      nav_title: 'LIBRARY',
      nav_item: [
        {key: '4', name: 'My Collection', val: 'collection', to: '/my-collection', icon: 'icon-ipod'},
        {key: '5', name: 'My Cloud Disk', val: 'disk', to: '/cloud-disk', icon: 'icon-cdsvg'},
        {key: '6', name: 'My Radio', val: 'radio', to: '/my-radio', icon: 'icon-radio'}
      ]
    }
  }),
  props: {
    collapsed: Boolean
  },
  components: {},
  methods: {
    handleTabNight (e) {
      this.isNight = !this.isNight
    },
    handleSignIn (e) {
      console.log('sign-in')
    },
    handleTabContent (key, link) {
      // console.log(key, link);
      this.current = key
      this.$router.push(link)
    }
  }
}
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
    .ant-btn.sign {
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

.ant-menu-inline-collapsed {
  .layout-tab,
  .sign-in {
    padding: 0 !important;
  }
  .ant-menu-item .anticon {
    line-height: 0;
  }
}
</style>
