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

    <default-drawer></default-drawer>
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
import DefaultDrawer from '@/components/drawer/Drawer'
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
    DefaultDrawer
  },
  methods: {
    handleCollapsed (collapsed) {
      this.collapsed = collapsed
    },
  }
}
</script>

<style scoped lang="scss">
@import "@/scss/global";
.ant-layout-sider {
  background: var(--color-gray-100);
  height: 100vh;
  position: fixed;
  z-index: 99;
  overflow: auto;
}
.ant-layout-header {
  background: var(--color-gray-100);
  position: sticky;
  top: 0;
  z-index: 99;
  //   box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
  //     0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
}
.ant-layout-content{
  background: var(--color-gray-100);
}
.ant-layout-footer{
  background: var(--color-gray-100);
}

</style>