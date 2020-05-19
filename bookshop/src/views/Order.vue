<template>
  <div class="cart">
    <el-table border :data="order" style="width: 100%">
      <el-table-column prop="bookName" label="商品名称" width="240"></el-table-column>
      <el-table-column prop="address" label="地址" width="240"></el-table-column>
      <el-table-column prop="count" label="数量" width="180"></el-table-column>
      <el-table-column prop="priceNum" label="总价" width="180"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="danger"
            plain
            icon="el-icon-delete"
            size="mini"
            @click="dialogVisibleTrue(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="注意" :visible.sync="dialogVisible" width="20%">
      <span>确定要删除这个订单吗?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'cart',
  data() {
    return {
      dialogVisible: false,
      result: null,
    };
  },
  computed: {
    ...mapState(['order', 'user']),
  },
  methods: {
    ...mapActions(['getOrder', 'delOrder']),
    dialogVisibleTrue(data) {
      this.dialogVisible = true;
      this.result = data;
    },
    dialogSure() {
      this.result.token = this.user.token;
      this.delOrder(this.result);
      this.dialogVisible = false;
    },
  },
  mounted() {
    this.getOrder(this.user);
  },
};
</script>

<style scoped>
.cart {
  margin: auto;
  margin-top: 80px;
  text-align: left;
  width: 80%;
}
.el-table th > .cell {
  text-align: center;
}
.el-table td > .cell {
  text-align: center;
}

.createOrder {
  margin-top: 20px;
}
</style>
