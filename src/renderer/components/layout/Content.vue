<template>
    <a-layout-content>
        content
    </a-layout-content>
</template>

<script>
export default {
  name: 'DefaultContent',
  data: () => ({

  }),
  components: {

  }
}
</script>

<style scoped lang="scss">
@import "@/scss/global";
.ant-layout-content{
    @include theme--light-app;
    padding: 32px;
    padding-top: 16px;
    min-height: 1000px;
}
</style>
