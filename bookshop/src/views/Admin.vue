<template>
  <div class="admin">
    <el-table border height="500" :data="booklist" class="booktable">
      <el-table-column prop="id" label="商品ID" width="180"></el-table-column>
      <el-table-column label="封面">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.cover"
            fit='fill'></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="bookName" label="商品名称" width="180"></el-table-column>
      <el-table-column prop="author" label="作者" width="80"></el-table-column>
      <el-table-column prop="publish" label="出版社" width="180"></el-table-column>
      <el-table-column prop="stock" label="库存量" width="80"></el-table-column>
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
    <el-button class="createBook" type="primary" @click="showBookDialog">上架书籍</el-button>
    <el-dialog title="注意" :visible.sync="dialogVisible" width="20%">
      <span>确定要删除这个商品吗?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogSure">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="上架书籍" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="书名">
          <el-input v-model="form.bookName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="form.author" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出版社">
          <el-input v-model="form.publish" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单价">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="库存">
          <el-input v-model="form.stock" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-upload
        class="upload-demo"
        action="http://xyinproxy.free.idcfengye.com/file/upload"
        :limit="1"
        :file-list="fileList"
        :on-success="uploadCover">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
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
  name: 'Admin',
  data() {
    return {
      dialogVisible: false,
      dialogFormVisible: false,
      form: {},
      coverURL: '',
      fileList: [],
      result: null,
    };
  },
  computed: mapState(['user', 'booklist']),
  methods: {
    ...mapActions([
      'getList', 'addBook', 'delbook',
    ]),
    dialogVisibleTrue(data) {
      this.dialogVisible = true;
      this.result = data;
    },
    showBookDialog() {
      this.dialogFormVisible = true;
    },
    toSubmit() {
      const payload = {
        form: this.form,
        token: this.user.token,
      };
      this.addBook(payload).then((res) => {
        if (res) {
          this.dialogFormVisible = false;
        }
      });
    },
    uploadCover(response) {
      this.form.cover = response.data.url;
    },
    dialogSure() {
      const payload = {
        token: this.user.token,
        id: this.result.id,
      };
      this.delbook(payload);
      this.dialogVisible = false;
    },
  },
  mounted() {
    this.getList();
  },
};
</script>

<style scoped>
.admin {
  text-align: left;
  width: 80%;
  margin: auto;
}

.booktable {
  width: 100%;
  margin-top: 40px;
}

.createBook {
  margin-top: 40px;
}
</style>
