<template>
  <el-card class="login">
    <div class="title">登陆</div>
    <el-form label-position='right' label-width="80px" :model="loginData">
      <el-form-item label="账号">
        <el-input v-model="loginData.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="loginData.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登陆</el-button>
        <el-button>注册</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      loginData: {
        name: '',
        password: '',
      },
    };
  },
  computed: mapState(['user']),
  methods: {
    ...mapActions([
      'login',
    ]),
    onSubmit() {
      this.login(this.loginData);
      if (this.user.isAdmin === false) {
        this.$router.push('/');
      } else {
        this.$router.push('/admin');
      }
    },
  },
};
</script>

<style scoped>
.login {
  width: 50%;
  margin: auto;
  padding: 30px;
  margin-top: 100px;
}

.title {
  font-size: 20px;
  margin-bottom: 20px;
}
</style>
