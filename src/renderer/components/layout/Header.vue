<template>
  <a-layout-header>
    <a-icon
      class="trigger"
      :type="collapsed ? 'menu-unfold' : 'menu-fold'"
      @click="handleCollapsed"
    />

    <span class="search-input">
      <my-icon type="icon-sousuo" class="s-icon" @click="handleGlobalSearch"></my-icon>
      <input
        type="text"
        class="global-search"
        placeholder="输入歌名，歌手或专辑名搜索"
        v-model="keywords"
        @keyup.enter="handleGlobalSearch"
      />
    </span>

    <!-- <span>
      <a-input-search v-model="QQKeywords" placeholder="input search text" enter-button @search="onSearch" />  
    </span> -->
  </a-layout-header>
</template>

<script>
export default {
  name: 'DefaultHeader',
  data: () => ({
    collapsed: false,
    keywords: '',
    // QQKeywords:''
  }),
  props: {},
  components: {},
  methods: {
    handleCollapsed (e) {
      this.collapsed = !this.collapsed
      this.$emit('tabCollapsed', this.collapsed)
    },

    handleGlobalSearch (e) {
      console.log(this.keywords)
      const {name, params} = this.$route
      if(!this.keywords) return
      if(name === 'search' && params.keywords === this.keywords) return
      this.$router.push({
        name:'search',
        params:{ keywords: this.keywords}
      })
    },
    // onSearch(){
    //   console.log(this.QQKeywords)
    //   const {name, params} = this.$route
    //   if(!this.QQKeywords) return
    //   if(name === 'qqsearch' && params.QQKeywords === this.QQKeywords) return
    //   this.$router.push({
    //     name:'qqsearch',
    //     params:{ QQKeywords: this.QQKeywords}
    //   })
    // }
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
      @include my-input;
      background: var(--color-gray-100);
      color: $main-text-color;
      // border: 1px solid transparent;
      // text-indent: 27px;
      // &:focus {
      //   border-radius: 4px;
      //   background-color: rgba($color: #999, $alpha: 0.5);
      //   transition: 0.5s;
      //   outline: none;
      // }
    }
  }
}
.trigger {
  font-size: 18px;
  line-height: 64px;
  cursor: pointer;
  transition: color 0.3s;
  color: #999;
  &:hover {
    color: #1890ff;
  }
}
</style>
