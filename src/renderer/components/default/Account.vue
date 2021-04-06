<template>
  <div>
    <a-popover :title="`当前用户:${profile.nickname}`" placement="leftTop" v-if="logged">
      <template slot="content">
        <a-button @click="handleSignOut">Sign-out</a-button>
        <a-button>Personal</a-button>
      </template>
      <a-button class="sign sign-out" style="padding: 0" >
        <a-avatar shape="circle" :size="30" :src="profile.avatarUrl">
        </a-avatar>
      </a-button>
    </a-popover>

    <a-button
      class="sign"
      type="link"
      style="padding: 0"
      @click="handleSignIn"
      v-else
    >
      <my-icon type="icon-login-settings" style="marginright: 3px"></my-icon>
      <span>sign-in</span>
    </a-button>
  </div>
</template>

<script>
import { get, sync,dispatch } from "vuex-pathify";
export default {
  name: "DefaultAccount",
  data: () => ({}),
  components: {},
  computed: {
    showLogin: sync("myapp/showLogin"),
    profile: get("settings/account@profile"),
    logged: (vm) => vm.$store.getters["settings/logged"],
  },
  methods: {
    handleSignIn(e) {
      this.showLogin = !this.showLogin;
    },
    handleSignOut(e) {
      dispatch('settings/signOut');
      location.reload()
    },
  },
};
</script>

<style scoped lang="scss">
.ant-btn.sign {
  margin-top: 4px;
  margin-left: 2px;
  span {
    margin-left: 0;
  }
}
.sign-out {
  border-color: transparent;
}

</style>
