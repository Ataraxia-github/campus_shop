<template>
  <div>
    <div class="searchscope">
      <div>
        <input type="text" placeholder="快速搜索商品" v-model="keywords"/>
        <el-button type="info" icon="el-icon-search" @click="postSearch"></el-button>
        <a @click="returnall">返回所有商品</a>
      </div>
    </div>
    <el-table :data="showdata" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.goodsname }}</span>
            </el-form-item>
            <el-form-item label="商品 ID">
              <span>{{ props.row.goodsid }}</span>
            </el-form-item>
            <el-form-item label="商品分类号">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="商品价格">
              <span>￥{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="商品库存">
              <span>{{ props.row.counts }}</span>
            </el-form-item>
            <el-form-item label="商品简述">
              <span>{{ props.row.shortname }}</span>
            </el-form-item>
            <el-form-item label="商品图片">
              <img :src="props.row.goodsurl" style="width: 70px" />
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品 ID" prop="goodsid" width="200px">
      </el-table-column>
      <el-table-column label="商品名称" prop="goodsname" width="300px">
      </el-table-column>
      <el-table-column label="商品简述" prop="shortname" width="500px">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="props">
          <el-button size="mini" @click="handleEdit(props.$index, props.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(props.$index, props.row)"
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
  name: "MasterGoods",
  data() {
    return {
      // 搜索商品输入的关键词
      keywords: "",
      // 所有商品的数据
      alldata: [],
      // 分页器展现出来的当前页商品数据
      showdata: [],
      // 分页器当前页码
      currentIndex: 1,
      // 每一页展示商品的个数
      pageSize: 6,
    };
  },

  mounted() {
    this.getData();
  },
  methods: {
    // 获取所有商品的信息
    async getData() {
      let result = await this.$store.dispatch("getAllGoods");
      // 存下所有商品的信息
      this.alldata = result;
      this.getshowdata();
    },
    // 根据分页器页码查询当前页的商品
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
      if(this.keywords){
        this.showdata = []
        this.getshowdata();
      }else{
      this.showdata = [];
      this.getData();
      }
    },
    // 点击编辑按钮
    // 第一个参数是当前列的序号，第二个参数是当前列的详细信息
    handleEdit(index, row) {
      // 把要编辑的商品存入本地中，让编辑页面去接收
      localStorage.setItem("goodsInfo", JSON.stringify(row));
      this.$router.replace("/admin/editgoods");
    },
    // 删除某个商品
    handleDelete(index, row) {
      this.$confirm("您是否确定删除此商品?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let result = await this.$store.dispatch("deleteGoods", {
            goodsid: row.goodsid,
          });
          if (result == "ok") {
            // 删除成功，重新获取数据展示页面
            this.$router.replace("/admin/supplierallback");
            this.$message({
              type: "success",
              message: "商品删除成功!",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 快速搜索商品
    async postSearch(){
      if(this.keywords){
        this.showdata = [];
        let keywords = this.keywords
        let result = await this.$store.dispatch('adminQuickSearch',{keywords})
        if(result!='null'){
        this.alldata = result;
        this.getshowdata();
        }else{
          this.$message({
            type: 'info',
            message: '商品库中没有找到该商品！'
          })
        }
      }
    },
    // 返回所有商品
    returnall(){
      this.keywords = ''
      this.showdata = []
      this.getData();
    }
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
a {
  text-decoration: underline;
  margin-left: 10px;
  cursor: pointer;
  color: gray;
}

/* 搜索框的位置 */
.searchscope {
  margin-top: 10px;
  margin-right: 30px;
  float: right;
}

/* 搜索框后面的小框 */
.searchscope div {
  display: flex;
  align-items: center;
}
/* 搜索部分的输入框 */
.searchscope input {
  padding-left: 10px;
  width: 300px;
  height: 30px;
  font-size: 14px;
  line-height: 30px;
  border: 2px solid gray;
  /* 输入框右边无边框 */
  border-right: none;
  outline: none;
  box-sizing: border-box;
}
/* 输入框后面的小方框放置一个搜索图标 */
.searchscope button.el-button.el-button--info {
  padding: 0;
  width: 40px;
  height: 30px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  border-radius: 0;
  outline: none;
  display: flex;
  /* 居中对齐 */
  justify-content: center;
  /* 垂直对齐 */
  align-items: center;
  border: 1px solid gray;
  box-sizing: border-box;
}

.el-table {
  margin: 20px auto 80px;
}

.demo-table-expand {
  font-size: 0;
  padding-left: 30px;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.el-pagination {
  text-align: center;
}
</style>