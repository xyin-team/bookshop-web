<template>
  <el-card shadow="hover" class="item">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-image
            style="width: 100px; height: 100px"
            :src="detail.cover"
            fit='fill'></el-image>
        </el-col>
        <el-col :span="18">
          <div class="detail">
            <div class="bookname">
              {{ detail.bookName }}
            </div>
            <div class="author">
              作者：{{ detail.author }}
            </div>
            <div class="publish">
              出版社：{{ detail.publish }}
            </div>
            <div class="desc">
              描述：{{ detail.description }}
            </div>
            <div class="price">
              价格：{{ detail.price }}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-button class="addToCart" @click="checkLogin(detail)">加入购物车</el-button>
    </el-card>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      detail: {},
    };
  },
  computed: mapState(['login']),
  beforeMount() {
    for (let i = 0; i < this.$store.state.booklist.length; i += 1) {
      if (this.$store.state.booklist[i].id === this.$route.query.id) {
        this.detail = this.$store.state.booklist[i];
      }
    }
  },
  methods: {
    ...mapActions(['login', 'addToCart']),
    checkLogin(detail) {
      if (this.login) {
        this.addToCart(detail);
      } else {
        this.$router.push('/login');
      }
    },
  },
};
</script>

<style scoped>
.item {
  width: 60%;
  margin: auto;
  margin-top: 100px;
  margin-bottom: 20px;
  box-shadow: 0 6px 20px -6px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.cover {
  height: 140px;
}

.detail {
  text-align: left;
}

.bookname {
  font-size: 26px;
}

.addToCart {
  margin-top: 20px;
}
</style>
