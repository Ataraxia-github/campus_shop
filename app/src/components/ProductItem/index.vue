<template>
  <div class="pro">
    <img class="cardimg" :src="pro.goodsurl" />
    <div class="cardinfo">
      <p>
        <em>{{ pro.price | moneyFormat }}</em>
      </p>
      <p>{{ pro.shortname }}</p>
    </div>
    <div class="gotosearch">
      <a @click="goDetail(pro.goodsid)"
        ><el-button type="success">查看详情</el-button></a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductItem",
  props: ["pro"],
  methods: {
    goDetail(id) {
      this.$router.replace(`/goods/${id}`)
    },
  },
};
</script>

<style scoped>
.pro {
  float: left;
  position: relative;
  margin-right: 20px;
  width: 360px;
  height: 100%;
  background: white;
  display: flex;
  border-radius: 2%;
}
/* 卡片上的商品图片 */
.pro > .cardimg {
  margin: 15px;
  width: 120px;
  height: 120px;
}
.pro > .cardinfo {
  margin-top: 10px;
  height: 130px;
  width: 140px;
  line-height: 25px;
}
.cardinfo > p {
  margin-bottom: 10px;
}
/* 商品卡片上的价格 */
.cardinfo > p:first-child {
  color: red;
  font-size: 18px;
  font-weight: bolder;
}
/* 商品简述 */
.cardinfo > p:nth-child(2) {
  font-size: 14px;
}
/* 查看详情按钮 */
.pro > .gotosearch {
  position: absolute;
  bottom: 12px;
  right: 15px;
}
.gotosearch > a button {
  padding: 0;
  width: 90px;
  height: 30px;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>