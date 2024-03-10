<template>
  <div class="goods-detail">
    <div class="goods-detail-top">商品信息</div>
    <div class="goods-detail-group">
      <div class="goods-icon">
        <span>图片</span>
        <img :src="goodsInfo.goodsurl" />
      </div>
      <div class="goods-item">
        <span>ID</span>
        <span>{{ goodsInfo.goodsid }}</span>
      </div>
      <div class="goods-item">
        <span>商品简称</span>
        <el-input
          type="text"
          placeholder="请输入内容"
          v-model="goodsInfo.shortname"
          style="width: 300px"
        >
        </el-input>
      </div>
      <div class="goods-item">
        <span>分类</span>
        <el-select placeholder="请选择" v-model="goodsInfo.category">
          <el-option  v-for="(item,index) in options" :key="index" :label="item.catename" :value="item.categoryId"> </el-option>
        </el-select>
      </div>
      <div class="goods-item">
        <span>价格</span>
        <el-input
          type="text"
          placeholder="请输入价格"
          style="width: 100px"
          v-model="goodsInfo.price"
        >
        </el-input>
      </div>
      <div class="goods-item">
        <span>库存</span>
        <el-input
          type="text"
          placeholder="请输入库存"
          style="width: 100px"
          v-model="goodsInfo.counts"
        >
        </el-input>
      </div>
      <div class="goods-item">
        <span>描述</span>
        <el-input
          type="text"
          placeholder="请输入内容"
          v-model="goodsInfo.goodsname"
          style="width: 450px"
        >
        </el-input>
      </div>
      <button class="btn-back" @click="goBack">返回</button>
      <button class="btn-edit" @click="editGoods">确定修改商品信息</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditGoods",
  data() {
    return {
      // 商品信息
      goodsInfo: {},
      // 分类选项
      options: [],
    };
  },
  mounted() {
    // 获取本地存储的商品信息
    this.goodsInfo = JSON.parse(localStorage.getItem("goodsInfo"));
    this.getCateData()
    
  },
  methods: {
    // 获取分类信息
    async getCateData(){
      let result = await this.$store.dispatch('changeGoodsCate')
      this.options = result
    },

    // 编辑修改商品
    async editGoods() {
      let result = await this.$store.dispatch("editGoods", this.goodsInfo);
      if (result == "ok") {
        this.$message({
          type: "success",
          message: "修改成功",
        });
        this.$router.replace("/admin");
      } else {
        this.$message({
          type: "info",
          message: "请稍后再试！",
        });
      }
    },
    // 返回
    goBack(){
      this.$router.replace('/admin/mastergoods')
    }
  },
};
</script>

<style>
.goods-detail {
  width: 70%;
  height: 100%;
  margin: 20px auto;
}

.goods-detail-top {
  width: 100%;
  height: 60px;
  line-height: 60px;
  padding-left: 20px;
  font-weight: bold;
  font-size: 18px;
}

.goods-detail-group {
  margin: 20px auto;
  padding-left: 20px;
}

.goods-icon {
  height: 60px;
  padding: 0 10px;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
img {
  width: 50px;
  border-radius: 50%;
}

.goods-item {
  height: 50px;
  padding: 0 10px;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

input {
  border: 1px solid #ccc;
  outline: none;
  text-align: right;
  width: 300px;
}

button {
  width: 20%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin: 60px 0;
  border: none;
  font-size: 16px;
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
}

.btn-edit {
  background-color: #e9232c;
  margin-left: 100px;
}

.btn-back {
  background-color: #ccc;
}
</style>