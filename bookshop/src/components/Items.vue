<template>
  <div class="booklist">
    <el-card shadow="hover" v-for="item in items" :key="item.id" class="item">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="cover">
          </div>
        </el-col>
        <el-col :span="18">
          <div class="detail">
            <div class="bookname">
              {{ item.name }}
            </div>
            <div class="author"></div>
            <div class="desc"></div>
            <div class="price"></div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Items',
  data() {
    return {
      items: [
        {
          id: 1,
          name: '三国演义',
          desc: '这是一本三国演绎',
          price: 14.0,
          cover: 'xx',
          auther: '罗贯中',
        },
        {
          id: 2,
          name: '三国演义',
          desc: '这是一本三国演绎',
          price: 14.0,
          cover: 'xx',
          auther: '罗贯中',
        },
        {
          id: 3,
          name: '三国演义',
          desc: '这是一本三国演绎',
          price: 14.0,
          cover: 'xx',
          auther: '罗贯中',
        },
      ],
    };
  },
};
</script>

<style scoped>
.booklist {
  margin-top: 10px;
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
