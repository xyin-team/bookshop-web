<template>
  <el-container>
    <el-header class="header">
      <el-row justify="space-between">
        <el-col :span="4">
          <div class="logo" @click="toHome()">
            BookShop
          </div>
        </el-col>
        <el-col :offset="16" :span="4">
          <div class="operating">
            <div v-if="!login" @click="Login()">登陆</div>
            <div v-if="!login" @click="Register()">注册</div>
            <div v-if="login">{{ user.name }}</div>
            <el-dropdown v-if="login">
              <span class="el-dropdown-link">
                更多操作<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="toChart()">
                  购物车
                </el-dropdown-item>
                <el-dropdown-item @click.native="toOrder()">我的订单</el-dropdown-item>
                <el-dropdown-item @click.native="quit()">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main class="main">
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
// @ is an alias to /src
export default {
  name: 'Home',
  data() {
    return {};
  },
  computed: mapState(['login', 'user']),
  methods: {
    ...mapActions([
      'quit',
    ]),
    Login() {
      this.$router.push({ path: '/login' });
    },
    Register() {
      this.$router.push({ path: '/register' });
    },
    toChart() {
      this.$router.push('/cart');
    },
    toOrder() {
      this.$router.push('/order');
    },
    toHome() {
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
.header {
  box-shadow: 0 6px 20px -6px rgba(0, 0, 0, 0.1);
  position: fixed;
  top:0;
  width: 100%;
  z-index: 10;
}

.logo {
  height: 60px;
  font-size: 24px;
  line-height: 60px;
}

.operating {
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  line-height: 60px;
}

.booklist {
  margin-top: 40px;
}
</style>
