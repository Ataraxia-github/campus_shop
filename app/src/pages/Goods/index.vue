<template>
  <div id="container" v-if="goodsDetail[0]">
    <!-- 商品详情显示 -->
    <div class="productcontent">
      <div class="productimg">
        <div>
          <img :src="goodsDetail[0].goodsurl" />
        </div>
      </div>
      <div class="productinfo">
        <div class="infotitle">
          <h1>{{ goodsDetail[0].goodsname }}</h1>
        </div>
        <div class="productinfo_price">
          <dl>
            <dt>价格</dt>
            <dd>
              <div class="showprice">
                <span class="tradeprice"
                  >￥{{ goodsDetail[0].price || moneyFormat }}</span
                >
                <b>保质保量</b>
              </div>
            </dd>
          </dl>
          <dl>
            <dt>校园优惠</dt>
            <dd>现货速取</dd>
          </dl>
        </div>

        <div class="productinfo_console">
          <dl class="consolepart">
            <dt>购买数量</dt>
            <dd>
              <div class="changenum">
                <el-input-number
                  v-model="num"
                  :min="1"
                  :max="goodsDetail[0].counts"
                ></el-input-number>
              </div>
              <span>库存</span><em>{{ goodsDetail[0].counts }} </em
              ><span>件</span>
            </dd>
          </dl>
          <div class="shopcar">
            <el-button type="success" @click.prevent="addToCart(goodsDetail[0])"
              >加入购物车</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <!-- 商品评价 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品评价</span>
      </div>
      <div v-if="this.commentList.length">
        <div v-for="(comment,index) in this.commentList" :key="index" class="text item">
        <div class="itemtop">来自用户-- {{comment.username}}  <span>{{comment.commentdate | dateFormat}} </span></div>
        <div class="itemshow">{{comment.comment}}</div>
      </div>
      </div>
      <div v-else><span style="color:gray">抱歉，该款商品暂无评价信息</span></div>
    </el-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { MessageBox } from "element-ui";
export default {
  name: "Good",
  data() {
    return {
      moneyFormat: "",
      // 买家购买的数量
      num: 1,
      // 当前查看的是哪个商品的详情信息，clickGoodsId从路径的query参数取得
      clickGoodsId: 0,
      // 商品评价
      commentList: []
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
      goodsDetail: (state) => state.goods.goodsDetail,
    }),
  },
  mounted() {
    // 获取商品详情信息
    this.getData();
    // 获取商品评价
    this.getGoodsComment()
  },
  watch: {
    // 监视路径，有些用户可能会直接修改路径去查看其他商品详情
    $route() {
      this.getData();
      this.getGoodsComment()
    },
  },
  methods: {
    // 查询商品详情信息的回调方法
    getData() {
      this.clickGoodsId = Number(this.$route.params.id);
      this.$store.dispatch("getGoodsDetail", {
        goodsNo: this.clickGoodsId,
      });
      // 请求当前用户信息
      this.$store.dispatch("getUserInfo");
    },
    // 添加商品到购物车
    // 携带的参数要包括商品id，商品名字，用户id，购买数量等
    async addToCart(goods) {
      // 用户要登录才能添加购物车
      if (this.userInfo) {
        let res = await this.$store.dispatch("getToShopCart", {
          userid: this.userInfo.id, //用户id
          goodsid: goods.goodsid, //商品id
          goodsname: goods.shortname, //商品简称
          goodsurl: goods.goodsurl, //商品图片
          price: goods.price, //商品价格
          buynum: this.num, //购买数量
          counts: goods.counts, //商品库存
        });
        if (res == "success") {
          MessageBox({
            type: "success",
            message: "商品已成功添加至购物车！",
            showClose: true,
          });
        } else if (res == "unknownErr") {
          MessageBox({
            type: "info",
            message: "服务器繁忙，请稍后再试！",
            showClose: true,
          });
        } else if (res == "occupyErr") {
          MessageBox({
            type: "info",
            message: "该商品已在购物车中，不能重复添加！",
            showClose: true,
          });
        }
        let userid = this.userInfo.id;
        this.$store.dispatch("getShopCartData", { userid });
        this.num = 1;
      } else {
        MessageBox({
          type: "info",
          message: "对不起，您还未登录！",
          showClose: true,
        });
      }
    },
    // 获取商品的评价
    async getGoodsComment(){
      let result = await this.$store.dispatch('getComment',{
        // 携带当前商品的id
        goodsid: this.clickGoodsId
      })
      if(result != 'notcomment'){
        this.commentList = result
      }else {
        this.commentList = []
      }
    }
  },
};
</script>

<style>
#container > .productcontent {
  width: 1200px;
  position: relative;
  z-index: 100;
  margin: 30px auto;
}

.productcontent > .productimg {
  float: left;
  position: relative;
  padding: 5px;
  width: 450px;
  height: 450px;
  border: 1px solid #ccc;
}

.productimg img {
  width: 120%;
  height: 120%;
  max-width: 100%;
  max-height: 100%;
}

.productcontent > .productinfo {
  margin: 0 0 0 520px;
  color: #666;
  padding: 0 0 5px;
}
.productinfo > .infotitle {
  padding: 20px 10px 12px;
  color: #000;
}
.infotitle > h1 {
  font-size: 24px;
  font-weight: bold;
  color: #000;
}
.productinfo > .productinfo_price {
  padding: 5px 20px;
  height: 200px;
  background-color: rgba(247, 244, 244, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.productinfo_price dl {
  display: flex;
  align-items: center;
  margin-bottom: 0 !important;
  cursor: pointer;
}
.productinfo_price dl dt {
  width: 70px;
  color: #999;
  font-size: 14px;
}
.productinfo_price dl dd {
  margin-bottom: 0 !important;
  font-family: Arial;
}
.productinfo_price dl dd div {
  display: flex;
  align-items: center;
}

.showprice {
  line-height: 24px;
  vertical-align: middle;
  color: #ff0036;
  font-size: 20px;
  font-family: Arial;
}

.showprice b {
  font-size: 12px;
  background: #f47a86;
  color: white;
  padding: 0 6px;
}

.showprice > .tradeprice {
  font-size: 20px;
  display: inline-block;
  margin-right: 12px;
  font-weight: bold;
}

.productinfo_console {
  margin: 5px 20px 5px 0;
  padding: 5px;
}
.consolepart {
  padding: 5px;
  font-size: 14px;
  color: black;
  cursor: pointer;
}
.consolepart dt {
  color: #999;
  font-size: 14px;
  text-align: left;
  width: 69px;
  margin: 0 0 0 8px;
  float: left;
}
.consolepart dd {
  font-size: 13px;
}
.consolepart dd div {
  display: inline-block;
  margin-right: 20px;
}
.changenum {
  height: 25px;
}
.changenum a {
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

.changenum > .num {
  width: 40px;
  height: 20px;
  text-align: center;
  display: inline-block;
}

.shopcar {
  margin: 20px auto 0;
  display: flex;
  justify-content: left;
}
.shopcar button {
  width: 200px;
  height: 40px;
  border-radius: 10%;
  margin-left: 40px;
  margin-top: 50px;
  outline: none;
  font-size: 18px;
}


/* 评价部分 */
.text {
  font-size: 16px;
}

.item {
  margin-bottom: 20px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 90%;
  margin: 10px auto;
}

.itemtop {
  width: 100%;
  height: 30px;
  font-size: 15px;
}

.itemtop > span {
  margin-left: 100px;
  color: gray;
}

.itemshow {
  width: 100%;
  height: 50px;
  font-size: 17px;
  font-weight: bold;
}
</style>