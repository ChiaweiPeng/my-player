<template>
  <router-link :to="`/moods_genres/${moon.name}`" class="moon-cover" :style="`border-left-color: ${moon.color};color:#333`">
      <span class="type-name">{{ moon.name }}</span>
  </router-link >
</template>

<script>
export default {
  name: 'MoonCover',
  data: () => ({}),
  props: {
    moon: Object
  },
  components: {}
}
</script>

<style scoped lang="scss">
@import "@/scss/global";
.moon-cover {
  display:block; 
  line-height: 36px;
  padding-left:17px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 6px;
  border-left: 6px solid;
  border-left-color: $theme-color;
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
