<template>
  <a-layout-header>
    <a-icon
      class="trigger"
      :type="collapsed ? 'menu-unfold' : 'menu-fold'"
      @click="handleCollapsed"
    />

    <span class="search-input">
      <my-icon type="icon-sousuo" class="s-icon" @click="hanldeGobalSearch"></my-icon>
      <input
        type="text"
        class="global-search"
        placeholder="Search for songs,artist,albums here"
        v-model="searchVal"
        @keyup.enter="hanldeGobalSearch"
      />
    </span>
  </a-layout-header>
</template>

<script>
export default {
  name: 'DefaultHeader',
  data: () => ({
    collapsed: false,
    searchVal: ''
  }),
  props: {},
  components: {},
  methods: {
    handleCollapsed (e) {
      this.collapsed = !this.collapsed
      this.$emit('tabCollapsed', this.collapsed)
    },

    hanldeGobalSearch (e) {
      console.log(this.searchVal)
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/scss/global";
@import "@/scss/common";
.ant-layout-header {
  padding: 0 24px;
  background-color: #fff;
  height: 56px;
  line-height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .search-input {
    position: relative;
    .s-icon{
      font-size: 1.2rem;
      color: $theme-color;
      position: absolute;
      left: 5px;
      top:18px;
    }
    .global-search {
      height: 30px;
      min-width: 18vw;
      border: 1px solid transparent;
      text-indent: 27px;
      &:focus {
        border-radius: 4px;
        background-color: rgba($color: #999, $alpha: 0.5);
        transition: 0.5s;
        outline: none;
      }
    }
  }
}
.trigger {
  font-size: 18px;
  line-height: 64px;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #1890ff;
  }
}
</style>
