<template>
  <div id="mysales">
    <h3>我的订单</h3>
    <el-table :data="showdata" style="width: 100%">
      <el-table-column label="订单编号" prop="tradeId" width="100px"> </el-table-column>
      <el-table-column label="订单时间" width="200px">
        <template slot-scope="scope">{{scope.row.tradetime | dateFormat}}</template>
         </el-table-column>
      <el-table-column label="姓名" prop="username"> </el-table-column>
      <el-table-column label="联系方式" prop="userphone"> </el-table-column>
      <el-table-column label="收货地址" prop="useraddress" width="200px"> </el-table-column>
      <el-table-column label="订单备注" prop="tradetip" width="280px"></el-table-column>
      <el-table-column label="订单金额" prop="trademoney" ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="props">
          <!-- 参数是当前行的订单编号 -->
          <el-button type="text" @click="looktrade(props.row.tradeId)"
            >订单详情及评价</el-button
          >
          <el-dialog title="商品清单" :visible.sync="dialogTableVisible">
            <el-table :data="gridData">
              <el-table-column
                property="goodsid"
                label="商品ID"
                width="120"
              ></el-table-column>
              <el-table-column
                property="goodsname"
                label="商品名称"
                width="250"
              ></el-table-column>
              <el-table-column
                property="buycount"
                label="购买数量"
                width="120"
              ></el-table-column>
              <el-table-column
                property="price"
                label="商品总价"
                width="120"
              ></el-table-column>
              <el-table-column>
                <template slot-scope="props">
                  <el-button type="text" @click="gotoComment(props.row.goodsid,props.row.goodsname)"
                  
                    >去评价</el-button
                  >
                  <!-- 内层嵌套的el-dialog中使用append-to-body提升z-index -->
                  <el-dialog
                    title="商品评价"
                    :visible.sync="dialogCommentVisible"
                    append-to-body
                  >
                    <el-input
                      type="textarea"
                      :rows="4"
                      placeholder="请输入您对该商品的评价"
                      v-model="commenttext"
                    >
                    </el-input>
                    <el-button
                      type="primary"
                      style="margin: 20px 0"
                      @click.stop="submitComment"
                      >确认评价</el-button
                    >
                  </el-dialog>
                </template>
              </el-table-column>
            </el-table>
          </el-dialog>
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
import { mapState } from "vuex";
export default {
  name: "Sales",
  data() {
    return {
      // 当前页面展示的订单信息
      showdata: [],
      // 所有的订单信息
      personaltradeinfo: [],
      // 分页器当前页码
      currentIndex: 1,
      // 每一页展示商品的个数
      pageSize: 6,
      // 弹出的对话框里显示具体的订单信息
      gridData: [],
      // 控制订单详情对话框的弹出与隐藏
      dialogTableVisible: false,
      // 控制评价对话框的弹出与隐藏
      dialogCommentVisible: false,
      // 商品评价
      commenttext: "",
      // 当前评价的商品id
      commentgoodsid: "",
      // 当前评论的商品名字
      commentgoodsname: ""
    };
  },
  methods: {
    // 派发action，获取所有的订单信息
    async getData() {
      let result = await this.$store.dispatch("getPersonalTradeInfo", {
        userid: this.userInfo.id,
      });
      // 从服务器拿到所有的订单信息
      this.personaltradeinfo = result;
      this.getshowdata();
    },
    // 根据分页器页码查询当前页的商品
    getshowdata() {
      this.personaltradeinfo.forEach((data, index) => {
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
    // 查看订单具体信息
    // 第一个参数是当前列序号，第二个参数是具体信息
    async looktrade(tradeId) {
      this.dialogTableVisible = true;
      let result = await this.$store.dispatch("getTradeDetailInfo", {
        tradeId: tradeId,
      });
      // 把订单里的具体信息转换回来变成对象形式
      let goodslist = JSON.parse(result.goodslist);
      this.gridData = goodslist;
    },
    // 前往评价，弹出评价对话框
    gotoComment(id,name) {
      // 目前获取到的这个id，就是要评价的商品的id
      this.commentgoodsid = id;
      this.commentgoodsname = name;
      this.dialogCommentVisible = true;
    },
    // 点击提交评价
    submitComment() {
      this.$confirm("您的评价将被所有人看到，确定发表吗?", "发表评价", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 发表评论，评论者，评论商品，评论内容，评论时间
          this.$store.dispatch("submitComment", {
            goodsid: this.commentgoodsid,
            goodsname: this.commentgoodsname,
            userid: this.userInfo.id,
            username: this.userInfo.username,
            comment: this.commenttext,
            commentdate: new Date().toLocaleString(),
          });
          this.$message({
            type: "success",
            message: "评价发表成功!",
          });
          // 清空评价内容
          this.commenttext = ''
          // 隐藏对话框
          this.dialogCommentVisible = false;
        })
        .catch(() => {
          this.commenttext = ''
          this.$message({
            type: "info",
            message: "已取消发表",
          });
        });
    },
  },
  mounted() {
    // 一挂载就获取订单信息
    this.getData();
  },
  computed: {
    // 获取登录用户的信息
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
    // 计算一共需要多少页码
    pageNum() {
      return Math.ceil(this.personaltradeinfo.length / this.pageSize);
    },
  },
};
</script>

<style>
h3 {
  margin-left: 20px;
  color: gray;
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