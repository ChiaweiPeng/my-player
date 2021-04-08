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

      <a-input v-model="password" type="password" placeholder="请输入密码" size="large">
        <a-icon slot="prefix" type="key"></a-icon>
      </a-input>
    </div>

    <div class="btn-area">
      <a-button type="primary" :loading="loading" @click="login"
        >Login</a-button
      >
    </div>
  </a-modal>
</template>

<script>
import { sync } from 'vuex-pathify'
import { login } from '@/api'
import md5 from 'md5'
export default {
  name: 'DefaultLogin',
  data: () => ({
    phone: '',
    password: '',
    loading: false
  }),
  computed: {
    showLogin: sync('myapp/showLogin')
  },
  methods: {
    login () {
      this.loading = true
      login({
        phone: this.phone.replace(/\s/g, ''),
        md5_password: md5(this.password).toString(),
        countrycode: '86'
      })
        .then(({ code, profile, token }) => {
          if (code !== 502) {
            this.$store.dispatch('settings/updateAccount', { profile, token })
            this.showLogin = false
            this.$message.success('登录成功，欢迎您朋友')
            location.reload()
          } else {
            this.$message.error('手机号或密码错误')
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    handleCancel (e) {
      this.showLogin = false
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/scss/global";
.sub-title {
  color: $theme-color;
  font-size: 0.8rem;
  font-weight: 600;
}
.ant-input-affix-wrapper {
  margin-bottom: 15px;
}
.btn-area {
  text-align: center;
}
</style>

