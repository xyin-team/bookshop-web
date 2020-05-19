<template>
  <div class="booklist">
    <el-card shadow="hover"
      v-for="item in booklist" :key="item.id" class="item" @click.native="toDetail(item.id)">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-image
            style="width: 100px; height: 100px"
            :src="item.cover"
            fit='fill'></el-image>
        </el-col>
        <el-col :span="18">
          <div class="detail">
            <div class="bookname">
              {{ item.bookName }}
            </div>
            <div class="author">
              作者：{{ item.author }}
            </div>
            <div class="desc">
              描述：{{ item.description }}
            </div>
            <div class="price">
              价格：{{ item.price }}
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Items',
  data() {
    return {};
  },
  computed: mapState(['booklist', 'login']),
  mounted() {
    this.$store.dispatch('getList');
  },
  methods: {
    toDetail(id) {
      this.$router.push({ path: `/detail/${id}`, query: { id } });
    },
  },
};
</script>

<style scoped>
.booklist {
  margin-top: 80px;
}

.item {
  width: 60%;
  margin: auto;
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
</style>
