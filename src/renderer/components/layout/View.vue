<template>
  <a-layout-content>
      <keep-alive v-if="$route.meta.keepAlive">
          <router-view />
      </keep-alive>

      <router-view v-if="!$route.meta.keepAlive" />
  </a-layout-content>
</template>

<script>
export default {
  name: "DefaultView",
  data: () => ({}),
  components: {},
};
</script>

<style scoped lang="scss">
@import "@/scss/common";
.ant-layout-content {
  @include theme--light-app;
  padding: 32px;
  padding-top: 16px;
  min-height: 800px;
}
</style>
