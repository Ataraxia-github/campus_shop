<template>
  <div id="admin-sales">
    <el-table :data="showdata" style="width: 100%" :default-sort="{prop: 'tradeId',order:'descending'}">
      <el-table-column label="订单编号" prop="tradeId" width="100px">
      </el-table-column>
      <el-table-column label="订单时间" width="200px">
        <template slot-scope="scope">{{
          scope.row.tradetime | dateFormat
        }}</template>
      </el-table-column>
      <el-table-column label="姓名" prop="username" width="100px">
      </el-table-column>
      <el-table-column label="联系方式" prop="userphone" width="150px">
      </el-table-column>
      <el-table-column label="收货地址" width="180px" prop="useraddress">
      </el-table-column>
      <el-table-column label="订单备注" width="200px" prop="tradetip">
      </el-table-column>
      <el-table-column label="订单金额" prop="trademoney"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="props">
          <!-- 参数是当前行的订单编号 -->
          <el-button type="text" @click="looktrade(props.row.tradeId)"
            >查看订单详情</el-button
          >
          <el-dialog title="商品清单" :visible.sync="dialogTableVisible">
            <el-table :data="gridData">
              <el-table-column
                property="goodsid"
                label="商品ID"
                width="150"
              ></el-table-column>
              <el-table-column
                property="goodsname"
                label="商品名称"
                width="200"
              ></el-table-column>
              <el-table-column
                property="price"
                label="商品总价"
                width="200"
              ></el-table-column>
              <el-table-column
                property="buycount"
                label="购买数量"
                width="150"
              ></el-table-column>
            </el-table>
          </el-dialog>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="props">
          <el-button
            type="text"
            class="elbuttonstatus"
            @click="handlestatus(props.row.tradeId)"
            v-if="props.row.status == '等待处理'"
            >待处理订单</el-button
          >
          <el-button
            type="text"
            class="elbuttonstatus"
            v-else
            disabled
            style="color: gray"
            >已处理</el-button
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
import { mapState } from "vuex";
export default {
  name: "MasterSales",
  data() {
    return {
      // 当前页面展示的订单信息
      showdata: [],
      // 所有的订单信息
      alltradeinfo: [],
      // 分页器当前页码
      currentIndex: 1,
      // 每一页展示商品的个数
      pageSize: 6,
      // 弹出的对话框里显示具体的订单信息
      gridData: [],
      // 控制对话框的弹出与隐藏
      dialogTableVisible: false,
    };
  },
  methods: {
    // 派发action，获取所有的订单信息
    async getData() {
      let result = await this.$store.dispatch("getAllTradeInfo");
      // 从服务器拿到所有的订单信息
      this.alltradeinfo = result;
      // 把购买的商品信息转换成对象形式
      this.alltradeinfo.forEach((goods, index) => {
        goods.goodslist = JSON.parse(goods.goodslist);
      });
      this.getshowdata();
    },
    // 根据分页器页码查询当前页的商品
    getshowdata() {
      this.alltradeinfo.forEach((data, index) => {
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
      // console.log(this.gridData);
    },
    // 处理订单状态
    handlestatus(tradeId) {
      this.$confirm("是否确认该订单已完成?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("handleTradeStatus", {
            tradeId: tradeId,
          });
          this.$message({
            type: "success",
            message: "订单状态更新成功!",
          });
          this.showdata = [];
          this.getData();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
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
      return Math.ceil(this.alltradeinfo.length / this.pageSize);
    },
  },
};
</script>

<style>
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

.elbuttonstatus {
  color: red;
}
</style>