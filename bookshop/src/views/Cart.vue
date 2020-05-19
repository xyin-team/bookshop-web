<template>
  <div class="cart">
    <el-table border :data="cart" style="width: 100%">
      <el-table-column prop="id" label="商品ID" width="180"></el-table-column>
      <el-table-column prop="bookName" label="商品名称" width="180"></el-table-column>
      <el-table-column label="数量" width="180">
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-minus" @click="minusNum(scope.row)"></el-button>
          {{ scope.row.cartNum }}
          <el-button size="mini" icon="el-icon-plus" @click="addNum(scope.row)"></el-button>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="单价" width="180"></el-table-column>
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
    <el-button class="createOrder" type="primary" @click="showOrderDialog">创建订单</el-button>
    <el-dialog title="注意" :visible.sync="dialogVisible" width="20%">
      <span>确定要删除这个商品吗?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogSure">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="创建订单" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="配送地址">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="toSubmit">确 定</el-button>
      </div>
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
      dialogFormVisible: false,
      form: {
        address: '',
      },
    };
  },
  computed: {
    ...mapState(['cart', 'user']),
  },
  methods: {
    ...mapActions(['delProduct', 'handleChange', 'submit']),
    dialogVisibleTrue(data) {
      this.dialogVisible = true;
      this.result = data;
    },
    dialogSure() {
      this.delProduct(this.result);
      this.dialogVisible = false;
    },
    minusNum(value) {
      if (value.cartNum === 0) {
        return;
      }
      value.cartNum -= 1; // eslint-disable-line no-param-reassign
      this.handleChange(value);
    },
    addNum(value) {
      value.cartNum += 1; // eslint-disable-line no-param-reassign
      this.handleChange(value);
    },
    showOrderDialog() {
      this.dialogFormVisible = true;
    },
    toSubmit() {
      this.dialogFormVisible = false;
      console.log(this.form, this.cart, this.user);
      const payload = {
        form: this.form,
        cart: this.cart,
        user: this.user,
      };
      this.submit(payload);
    },
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
