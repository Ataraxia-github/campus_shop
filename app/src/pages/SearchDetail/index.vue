<template>
  <div>
    <div id="container">
      <div class="product">
        <div class="producttitle">
          <router-link to="/home" class="goHome">返回首页</router-link>
        </div>
        <div class="showpart" v-if="searchres.length">
          <ProductItem
            v-for="goods in searchres"
            :key="goods.goodsid"
            :pro="goods"
            class="pro"
          />
        </div>
        <div v-else>对不起！找不到您想要的商品。</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ProductItem from '@/components/ProductItem'
export default {
  name: "SearchDetail",
  components:{
    ProductItem
  },
  computed: {
    ...mapState({
      searchres: (state) => state.home.searchres
    })
  },
};
</script>

<style>
#container {
  position: relative;
  margin: 30px auto;
  width: 100%;
}
.product {
  margin: 0 auto;
  width: 980px;
}
.product > .producttitle {
  margin-bottom: 20px;
  width: 980px;
  height: 50px;
  line-height: 50px;
  font-size: 26px;
  font-family: sans-serif;
  font-weight: normal;
  color: #222;
}
.producttitle > h3 {
  display: inline-block;
}
.el-dropdown-link {
  display: inline-block;
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.goHome {
  font-size: 14px;
  display: inline-block;
  margin-left: 20px;
  text-decoration: none;
  color: skyblue;
  cursor: pointer;
}
.goHome:hover {
  color: #ccc;
}
.product > .showpart {
  margin: 0 auto;
  padding-left: 20px;
  width: 980px;
  height: 300px;
}
.showpart > .pro {
  position: relative;
  float: left;
  margin-right: 20px;
  margin-bottom: 20px;
  width: 300px;
  height: 200px;
  border: 1px solid gainsboro;
}

</style>