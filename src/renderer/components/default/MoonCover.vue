<template>
  <div class="moon-cover" :style="`border-left-color: ${moon.color}`">
    <span class="type-name">{{ moon.name }}</span>
  </div>
</template>

<script>
export default {
  name: "MoonCover",
  data: () => ({}),
  props: {
    moon: Object,
  },
  components: {},
};
</script>

<style scoped lang="scss">
@import "@/scss/global";
.moon-cover {
  height: 36px;
  line-height: 36px;
  min-width: 64px;
  padding: 0 16px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 6px;
  border-left: 6px solid;
  //   border-left-color: $theme-color;
  &:hover {
    background: #eaeaea;
    opacity: 0.8;
    transition: 0.4s;
    cursor: pointer;
  }
  .type-name {
    font-size: 0.7rem;
  }
}
</style>
