<template>
  <a-layout class="layout-container">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <default-navbar></default-navbar>
    </a-layout-sider>

    <a-layout
      :style="collapsed ? 'padding-left: 80px' : 'padding-left :200px'"
      style="position: relative; overflow: visible; transition :.2s"
    >
      <default-header @tabCollapsed="handleCollapsed"></default-header>
      <default-content></default-content>
    </a-layout>
  </a-layout>
</template>

<script>
import DefaultHeader from "@/components/layout/Header";
import DefaultNavbar from "@/components/layout/Navbar";
import DefaultContent from "@/components/layout/Content";
export default {
  name: "Layout",
  data: () => ({
    collapsed: false,
  }),
  components: {
    DefaultNavbar,
    DefaultHeader,
    DefaultContent,
  },
  methods: {
    handleCollapsed(collapsed) {
      this.collapsed = collapsed;
    },
  },
};
</script>

<style scoped lang="scss">
.ant-layout-sider {
  background-color: #fff;
  height: 100vh;
  position: fixed;
  z-index: 99;
}
.ant-layout-header {
  position: sticky;
  top: 0;
  z-index: 99;
//   box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
//     0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
}
</style>