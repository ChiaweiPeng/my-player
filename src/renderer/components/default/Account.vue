<template>
  <div>
    <a-popover
      :title="`当前用户:${profile.nickname}`"
      placement="leftTop"
      v-if="logged"
    >
      <template slot="content">
        <a-button @click="handleSignOut">登出</a-button>
        <a-button>个性化</a-button>
      </template>
      <a-button
        class="sign sign-out"
        :style="{ padding: 0, marginLeft: collapsed ? '24px' : 0 }"
      >
        <a-avatar shape="circle" :size="30" :src="profile.avatarUrl">
        </a-avatar>
      </a-button>
      <span v-if="!collapsed" class="out-name">{{ profile.nickname }}</span>
    </a-popover>

    <a-button
      class="sign"
      type="link"
      style="padding: 0"
      @click="handleSignIn"
      :style="{ padding: 0, marginLeft: collapsed ? '30px' : 0 }"
      v-else
    >
      <my-icon type="icon-login-settings" style="marginright: 3px"></my-icon>
      <span style="marginLeft:4px">登录</span>
    </a-button>
  </div>
</template>

<script>
import { get, sync, dispatch } from "vuex-pathify";
export default {
  name: "DefaultAccount",
  data: () => ({}),
  props: {
    collapsed: Boolean,
  },
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
      dispatch("settings/signOut");
      location.reload();
    },
  },
};
</script>

<style scoped lang="scss">
.ant-btn.sign {
  margin-top: 4px;
  margin-left: 2px;
  background: transparent;
  span {
    margin-left: 0;
  }
}
.sign-out {
  border-color: transparent;
}

.out-name{
  font-weight: 600;
  color: var(--color-gray-650);
  margin-left: 10px;
}
</style>
