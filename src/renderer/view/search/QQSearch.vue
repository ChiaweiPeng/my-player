<template>
  <div class="container">
      qqsearch
  </div>
</template>

<script>
import {getSearch} from '@/api/qqApi'
export default {
  name: 'QQSearch',
  data: () => ({

  }),
  props:{
      QQKeywords:String
  },
  components: {

  },
  watch:{
      QQKeywords(val){
          if(val){
              this.searchQQ()
          }
      }
  },
  created(){
      this.searchQQ()
  },
  methods:{
      searchQQ(){
          console.log('qqkey', this.QQKeywords)
          const requests = getSearch(this.QQKeywords)
          requests.catch(data => {
              console.log(data)
          })
      }
  }
}
</script>

<style scoped lang="scss">

</style>
