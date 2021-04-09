<template>
  <div class="myplayer">
    <default-navbar :collapsed="collapsed"></default-navbar>

    <a-layout
      :style="collapsed ? 'padding-left: 80px' : 'padding-left :250px'"
      style="position: relative; overflow: visible; transition: 0.2s"
    >
      <default-header @tabCollapsed="handleCollapsed"></default-header>
      <default-view></default-view>
    </a-layout>

    <a-drawer
      placement="bottom"
      height="100%"
      :closable="false"
      :visible="showLyricPage"
      @close="drawerClose"
    > 
      <drawer-content></drawer-content>
    </a-drawer>

    <default-login></default-login>
    <default-playbar></default-playbar>
  </div>
</template>

<script>
import DefaultHeader from '@/components/layout/Header'
import DefaultNavbar from '@/components/layout/Navbar'
import DefaultView from '@/components/layout/View'
import DefaultPlaybar from '@/components/playbar/PlayBar'
import DefaultLogin from '@/components/login'
import DrawerContent from '@/components/drawer/DrawerContent'
import {sync} from 'vuex-pathify'
export default {
  name: 'Layout',
  data: () => ({
    collapsed: false
  }),
  components: {
    DefaultNavbar,
    DefaultHeader,
    DefaultView,
    DefaultPlaybar,
    DefaultLogin,
    DrawerContent
  },
  computed:{
    showLyricPage: sync('myapp/showLyricPage'),
  },
  methods: {
    handleCollapsed (collapsed) {
      this.collapsed = collapsed
    },
    drawerClose(){
      this.showLyricPage = !this.showLyricPage
    }
  }
}
</script>

<style scoped lang="scss">
.ant-layout-sider {
  background-color: #fff;
  height: 100vh;
  position: fixed;
  z-index: 99;
  overflow: auto;
}
.ant-layout-header {
  position: sticky;
  top: 0;
  z-index: 99;
  //   box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
  //     0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
}
</style>