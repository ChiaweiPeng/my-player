<template>
    <a-modal
    title="登录"
    :visible="showLogin"
    centered
    :footer="null"
    :width="400"
    @cancel="handleCancel"
    >
    <p class="sub-title">- 请使用网易云手机账号登录</p>
    <div class="inp-area">
        <a-input v-model="phone" placeholder="请输入用户名" size="large">
            <a-icon slot="prefix" type="user"></a-icon>
        </a-input>

        <a-input v-model="password" placeholder="请输入密码" size="large">
            <a-icon slot="prefix" type="key"></a-icon>
        </a-input>
    </div>

    <div class="btn-area">
        <a-button type="primary" @click="handleClickLogin">Login</a-button>
    </div>
    </a-modal>
</template>

<script>
import { sync } from 'vuex-pathify'
import {login} from '@/api'
import md5 from 'md5'
export default {
  name: 'DefaultLogin',
  data: () => ({
      phone:'',
      password:''
  }),
  computed:{
      showLogin: sync('myapp/showLogin')
  },
  methods:{
      handleClickLogin(){
          console.log(md5(this.password).toString())
          login({
              phone: this.phone.replace(/\s/g, ''),
              md5_password: md5(this.password).toString(),
              countrycode: '86'
          })
          .then(({code, profile, token}) => {
              if(code!==502) {
                //   this.$store.dispatch('settings/updat eAccount', {profile, token})
                console.log(profile, token)
                  this.showLogin = false
                //   location.reload()
              }
          })
          .catch((error) => {
              console.log(error)
          })
      },
      handleCancel(e){
          this.showLogin = false
      }
  }
}
</script>

<style scoped lang="scss">
@import "@/scss/global";
.sub-title{
    color: $theme-color;
    font-size: .8rem;
    font-weight: 600;
}
.ant-input-affix-wrapper{
    margin-bottom: 15px;
}
.btn-area{
    text-align: center;
}
</style>

