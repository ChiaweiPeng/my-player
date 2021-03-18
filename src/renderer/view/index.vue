<template>
  <div class="layout-container">
      <default-navbar></default-navbar>
  </div>
</template>

<script>
// import DefaultHeader from "@/components/layout/Header";
import DefaultNavbar from "@/components/layout/Navbar"
export default {
  name: "Layout",
  data: () => ({}),
  components: {
      DefaultNavbar
  },
};
</script>

<style scoped lang="scss">
</style>