<template>
  <div>
    <el-table
      :data="showdata"
      style="width: 100%"
      :default-sort="{ prop: 'commentId', order: 'descending' }"
    >
      <el-table-column
        label="编号"
        prop="commentId"
        width="60px"
        align="center">
    <!-- <template slot-scope="scope">
        <span>{{(currentIndex - 1) * pageSize + scope.$index + 1}}</span>
    </template> -->
</el-table-column>
      <el-table-column label="评价时间" width="200px" >
        <template slot-scope="scope">
          {{ scope.row.commentdate | dateFormat }}
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="goodsname" width="400px">
      </el-table-column>
      <el-table-column label="评价内容" prop="comment" width="400px">
      </el-table-column>
      <el-table-column label="评价用户" prop="username"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="props">
          <el-button
            size="mini"
            type="danger"
            @click="delComment(props.row.commentId)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-count="pageNum"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "HandleComments",
  data() {
    return {
      // 所有商品的数据
      alldata: [],
      // 分页器展现出来的当前页商品数据
      showdata: [],
      // 分页器当前页码
      currentIndex: 1,
      // 每一页展示评价的个数
      pageSize: 6,
    };
  },
  methods: {
    // 获取所有评价信息
    async getData() {
      let result = await this.$store.dispatch("LookAllComments");
      // 存下所有商品的信息
      this.alldata = result;
      this.getshowdata();
    },
    // 根据分页器页码查询当前页的评价
    getshowdata() {
      this.alldata.forEach((data, index) => {
        if (
          index >= (this.currentIndex - 1) * this.pageSize &&
          index < this.currentIndex * this.pageSize
        ) {
          this.showdata.push(data);
        }
      });
    },
    // 点击分页器按钮查询其他分页
    handleCurrentChange(page) {
      this.currentIndex = page;
      this.showdata = [];
      this.getData();
    },
    // 删除评价
    delComment(id) {
      this.$confirm("您是否确定删除该条评价?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 派发action，进行删除
          this.$store.dispatch("delComment", {
            commentId: id,
          });
          // 重新获取评价信息
          this.showdata = [];
          this.getData();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {
    this.getData();
  },
  computed: {
    // 计算一共需要多少页码
    pageNum() {
      return Math.ceil(this.alldata.length / this.pageSize);
    },
  },
};
</script>

<style>
.el-table {
  margin: 20px auto 80px;
}

.el-pagination {
  text-align: center;
}
</style>
