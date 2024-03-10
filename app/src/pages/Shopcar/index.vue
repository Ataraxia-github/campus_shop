<template>
  <div id="shopcar">
    <div id="content">
      <div class="header">
        <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F00%2F83%2F09%2F58c88b3a68a47_610.jpg&refer=http%3A%2F%2Fpic.51yuansu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652861485&t=68f28bca9c9c5857d882a28a6c4a9a5b" class="header_logo" />
        <span>我的购物车</span>
      </div>
      <div class="shopcartitle">
        <span>全部商品</span>
      </div>
      <div class="shopcartmiddle">
        <div class="con_selet">
          <!-- 这个全选按钮必须要阻止冒泡事件，不然会影响下面的复选框 -->
          <input
            type="checkbox"
            class="con_selectAll"
            :checked="isSelectedAll"
            @click.stop="selectedAll(isSelectedAll)"
          />
          <label for="con_selectAll">全选</label>
        </div>
        <div>商品信息</div>
        <div>单价</div>
        <div>数量</div>
        <div>金额</div>
        <div>操作</div>
      </div>
      <div class="productitem" v-if="cartgoods.length">
        <div class="goods" v-for="(goods, index) in cartgoods" :key="index">
          <ul class="item_content">
            <li class="td td-chk">
              <div>
                <input
                  type="checkbox"
                  class="checkBox"
                  :checked="goods.checked"
                  @click="singleSelected(goods)"
                />
              </div>
            </li>
            <li class="td td-item">
              <div class="td-item-pic">
                <img :src="goods.goodsurl" />
              </div>
              <div class="td-item-info">{{ goods.goodsname }}</div>
            </li>
            <li class="td td-price">
              <strong>{{ (goods.price) | moneyFormat }}</strong>
            </li>
            <li class="td td-amount">
              <div class="item-amout">
                <!-- 输入框绑定change事件，修改购买数量 -->
                <el-input-number
                  v-model="goods.buycount"
                  :min="1"
                  :max="goods.counts"
                  @change="updateGoodsCount(goods, goods.buycount)"
                ></el-input-number>
              </div>
            </li>
            <li class="td td-sum">
              <strong>{{
                ((goods.buycount * goods.price)) | moneyFormat
              }}</strong>
            </li>
            <li class="td td-op"><a @click="deleGoods(goods)">删除</a></li>
          </ul>
        </div>
      </div>
      <div class="productitem" v-else>购物车里空空如也，快去选购心仪的商品吧！</div>
    </div>
    <div id="footer">
      <div class="foot_select">
        <input
          type="checkbox"
          class="foot_selectAll"
          name="foot_selectAll"
          :checked="isSelectedAll"
          @click.stop="selectedAll(isSelectedAll)"
        />
        <label for="foot_selectAll">全选</label>
      </div>
      <div class="foot_op">
        <a class="foot_remove" @click.prevent="clearCart">清空购物车</a>
      </div>
      <div class="foot_total">
        <div class="amout-sum">
          <span class="txt">已选商品</span>
          <strong id="selected_amout">{{ totalCount }}</strong>
          <span class="txt">件</span>
        </div>
        <div class="price-sum">
          <span class="txt">合计：</span>
          <strong class="selected_price">{{
            totalPrice | moneyFormat(totalPrice)
          }}</strong>
        </div>
        <div class="btn-area">
          <a class="btn-sumbit" :class="{'btn-allow': totalCount}" @click="goToPay">结&nbsp;算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Shopcar",
  data() {
    return {
      // 商品总价
      totalPrice: 0,
      // 选购的商品数
      totalCount: 0,
      // 购物车商品是否全选
      isSelectedAll: false,
      // 当前要删除的商品
      currentDelGoods: {}
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
      cartgoods: (state) => state.goods.cartgoods,
    }),
  },
  
  mounted(){
    this.onlyroad()
    this.getData();
  },
  methods: {
    onlyroad() {
    if (location.href.indexOf("#reloaded")<=0) {
      location.href = location.href + "#reloaded"+"#reloaded";
      location.reload();
    }
  },
    // 查看购物车信息
    getData() {
      let userid = this.userInfo.id;
      this.$store.dispatch("getShopCartData", { userid });
    },
    // 计算商品总价钱
    getAllGoodsPrice() {
      let totalPrice = 0;
      this.cartgoods.forEach((goods, index) => {
        if (goods.checked) {
          // 是选中状态的则加入计数
          totalPrice = totalPrice + goods.price * goods.buycount;
        }
      });
      this.totalPrice = totalPrice;
    },
    // 更新购物车中某个商品的购买数量
    updateGoodsCount(goods, count) {
      let userid = this.userInfo.id;
      this.$store.dispatch("UpdateShopCart", {
        goods,
        count,
        userid,
      }),
        // 重新计算价钱
        this.getAllGoodsPrice();
    },
    // 是否选中所有商品
    selectedAll(isSelectedAll) {
      // 点击一下，更改状态
      this.isSelectedAll = !isSelectedAll;
      // 派发action，修改每个商品的checked属性
      this.$store.dispatch("selectedAll", isSelectedAll);
      this.hasSelectedAll()
      // 重新计算价钱
      this.getAllGoodsPrice();
    },
    // 单个商品的选中与否
    singleSelected(goods) {
      this.$store.dispatch("singleSelected", { goods });
      this.hasSelectedAll()
      // 重新计算价钱
      this.getAllGoodsPrice();
    },
    // 计数处于选中状态的商品数量
    hasSelectedAll(){
      // 默认全选
      let flag = true
      // 处于选中状态的商品数量
      let totalNum = 0
      this.cartgoods.forEach((goods,index)=>{
        if(!goods.checked){
          flag = false
        }else{
          totalNum += 1
        }
      })
      this.totalCount = totalNum
      this.isSelectedAll = flag
    },
    // 删除购物车的某个商品
    deleGoods(goods){
      this.$confirm('您确定要删除这个商品吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let userid = this.userInfo.id
          this.currentDelGoods = goods
          this.$store.dispatch('delSomeGoods',{userid,goods})
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 清空购物车
    clearCart(){
      this.$confirm('您确定清空购物车吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let userid = this.userInfo.id
          this.$store.dispatch('clearCartGoods',{userid})
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 跳转到结算页面
    goToPay(){
      this.$router.replace('/trade')
    }
  },
  watch: {
    // 用户可能会离开购物车页面，已做操作要回复默认
    $route() {
      this.getData();
      // 监视路径跳转，用户离开购物车页面时，全部清零
      this.isSelectedAll = false
      this.totalCount = 0
      this.totalPrice = 0
    },
    // 监视购物车数据，只要一有变化就重新计数算钱
    cartgoods(){
      // 重新算选购的商品
      this.hasSelectedAll()
      // 重新计算价钱
      this.getAllGoodsPrice();
      if(!this.cartgoods.length){
        this.isSelectedAll = false
      }
    },
    
  },
};
</script>

<style>
#content > .header {
  width: 100%;
  height: 100px;
  margin-top: 20px;
  margin-left: 20px;
  position: relative;
}
.header > img {
  width: 80px;
  height: 80px;
  border: 1px solid gray;
  border-radius: 50%;
  cursor: pointer;
}
.header > span {
  display: inline-block;
  font-size: 25px;
  height: 35px;
  font-weight: bold;
  position: absolute;
  top: 30%;
  margin-left: 20px;
  cursor: pointer;
}
#content > .shopcartitle {
  margin: 10px auto;
  width: 80%;
  height: 35px;
  border-bottom: 2px solid #e6e6e6;
}
.shopcartitle > span {
  display: inline-block;
  font-weight: bold;
  font-size: 18px;
  height: 100%;
  width: 100px;
  text-align: center;
  line-height: 25px;
  cursor: pointer;
  color: green;
  border-bottom: 2px solid green;
}

#content > .shopcartmiddle {
  width: 80%;
  margin: 0 auto;
  height: 40px;
  display: flex;
  justify-content: space-around;
}

.shopcartmiddle > div {
  line-height: 40px;

}
.shopcartmiddle > div:nth-child(3) {
  width: 80px;
}


#content > .productitem {
  margin: 0 auto;
  width: 80%;
}

.productitem > .goods {
  background: #fcfcfc;
  width: 100%;
  height: 130px;
  border: 1px solid #cccccc;
}
.goods > .item_content {
  padding: 15px;
  list-style: none;
  display: flex;
  justify-content: space-around;
}

.item_content > .td-item {
  width: 180px;
  position: relative;
}
.td-item > div {
  display: inline-block;
}
.td-item > .td-item-pic > img {
  width: 80px;
  height: 80px;
}
.td-item > .td-item-info {
  position: absolute;
  width: 80px;
  line-height: 15px;
  font-size: 12px;
  top: 0;
  margin-left: 20px;
}
.item_content > .td-sum {
  color: #f40;
}
.td-amount > .item-amout {
  height: 25px;
}
.item-amout a {
  display: inline-block;
  height: 23px;
  width: 17px;
  border: 1px solid #e5e5e5;
  background: #f0f0f0;
  text-align: center;
  line-height: 23px;
  color: #444;
  cursor: pointer;
}
.item-amout a:hover {
  color: #f50;
  border-color: #f60;
}
.item-amout > .text_amount {
  width: 40px;
  height: 20px;
  text-align: center;
  display: inline-block;
}
.td-op a {
  color: black;
}
.td-op a:hover {
  cursor: pointer;
  color: #f40;
}
#footer {
  width: 80%;
  height: 50px;
  /* 固定定位 */
  position: fixed;
  bottom: 0;
  left: 10%;
  background: #e5e5e5;
  z-index: 9999;
}
#footer div {
  display: inline-block;
}
#footer > .foot_select {
  width: 50px;
  height: 50px;
  line-height: 50px;
  padding-left: 5px;
  cursor: pointer;
  font-size: 14px;
}
.foot_select input,
.foot_select label {
  cursor: pointer;
}
.foot_op {
  line-height: 50px;
  height: 50px;
}
.foot_op > .foot_remove {
  margin-left: 25px;
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
}
.foot_remove:hover {
  color: #f40;
}
.foot_total {
  float: right;
}
.foot_total > .amout-sum {
  cursor: pointer;
  height: 50px;
  color: #3c3c3c;
}
.foot_total .txt {
  line-height: 50px;
  font-size: 14px;
}
.amout-sum > #selected_amout {
  padding: 0 5px;
  color: #f40;
  font-weight: 700;
  font-size: 18px;
}
.price-sum {
  margin-left: 50px;
  margin-right: 10px;
}
.price-sum > .selected_price {
  color: #f40;
  font-weight: 700;
  font-size: 20px;
  line-height: 50px;
}
.btn-area > .btn-sumbit {
  display: inline-block;
  background: #b0b0b0;
  color: #fff;
  border-left: 1px solid #e7e7e7;
  width: 119px;
  height: 50px;
  cursor: not-allowed;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
}
.btn-area > .btn-sumbit.btn-allow {
  background: #f22d00;
  cursor: pointer;
}
</style>