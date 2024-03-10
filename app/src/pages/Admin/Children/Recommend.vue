<template>
  <div class="block">
    <h2>首页推荐商品</h2>
    <h4>------在这里，您可以选择三种商品，它们将被展示在超市首页。------</h4>
    <div class="recommend">
      <span>推荐商品1：</span>
      <el-input
        v-model="goods1"
        placeholder="请输入商品ID"
        @blur="confirm(goods1, $event)"
      ></el-input>
    </div>
    <div class="recommend">
      <span>推荐商品2：</span>
      <el-input
        v-model="goods2"
        placeholder="请输入商品ID"
        @blur="confirm(goods2, $event)"
      ></el-input>
    </div>
    <div class="recommend">
      <span>推荐商品3：</span>
      <el-input
        v-model="goods3"
        placeholder="请输入商品ID"
        @blur="confirm(goods3, $event)"
      ></el-input>
    </div>
    <el-button type="success" @click="recommendGoods">确认提交</el-button>
  </div>
</template>

<script>
import { MessageBox } from "element-ui";
export default {
  name: "Recommend",
  data() {
    return {
      // 分别是用户输入的三个商品id
      goods1: "",
      goods2: "",
      goods3: "",
    };
  },
  methods: {
    // 用户输入商品ID
    async confirm(id, event) {
      if (event.target.value != "") {
        let result = await this.$store.dispatch("confirmGoodsId", {
          goodsid: id,
        });
        if (result == "err") {
          MessageBox({
            type: "info",
            message: "该ID对应的商品不存在!",
            showClose: true,
          });
          // 当前触发事件的对象的值置为空，也就是清空输入框
          event.target.value = "";
        } else if (result == "ok") {
          this.$message({
            type: "success",
            message: "已找到该ID对应的商品！",
          });
        }
      }
    },
    // 点击确认提交按钮
    recommendGoods() {
      if (this.goods1 && this.goods2 && this.goods3) {
        this.$confirm("您确定在首页推荐展示这些商品吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            // 发送请求
            this.$store.dispatch("admitRecommend", {
              goods1: this.goods1,
              goods2: this.goods2,
              goods3: this.goods3,
            });

            this.$message({
              type: "success",
              message: "推荐成功!",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消推荐！",
            });
          });
      } else {
        MessageBox({
          type: "info",
          message: "您并未输入完整的商品ID信息！",
          showClose: true,
        });
      }
    },
  },
};
</script>

<style scoped>
h2 {
  margin-left: 30px;
  margin-top: 30px;
}

h4 {
  margin-left: 30px;
  margin-top: 30px;
  font-size: 16px;
  color: gray;
}

span {
  margin-left: 30px;
}

.el-input {
  width: 150px;
}

.recommend {
  margin-top: 40px;
  margin-left: 30px;
}

.el-button {
  margin-top: 40px;
  margin-left: 200px;
  font-size: 15px;
}
</style>