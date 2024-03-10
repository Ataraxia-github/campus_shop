<template>
  <div class="trade-container">
    <div class="content">
      <h4>顾客信息:</h4>
      姓名：<el-input
        v-model="username"
        placeholder="请输入您的收货用户名"
        style="width: 200px; margin-right: 40px"
      ></el-input>
      手机号码：<el-input
        v-model="userphone"
        placeholder="请输入您的收货手机号"
        style="width: 200px; margin-right: 40px"
        @blur="phoneRight"
      ></el-input>
      收货地址：<el-input
        v-model="useraddress"
        placeholder="请输入您的收货地址"
        style="width: 400px"
      ></el-input>
      <h3>请核对订单信息</h3>
      <div class="detail" v-if="tradegoodslist.length">
        <h4>订单列表</h4>
        <ul
          class="list clearFix"
          v-for="goods in tradegoodslist"
          :key="goods.goodsid"
        >
          <li>
            <img :src="goods.goodsurl" style="width: 100px; height: 100px" />
          </li>
          <li>
            <p style="font-weight: bold">{{ goods.goodsname }}</p>
            <h4>7天无理由退货</h4>
          </li>
          <li class="inlist">
            <h3>￥{{ goods.price }}.00</h3>
          </li>
          <li class="inlist">X{{ goods.buycount }}</li>
          <li class="inlist">有货</li>
        </ul>
      </div>
      <div v-else>对不起！您没有订单信息！</div>
      <div class="bbs">
        <h5>订单备注：</h5>
        <textarea
          placeholder="您可以在此处给卖家留言"
          class="remarks-cont"
          v-model="tradetip"
        ></textarea>
      </div>
    </div>
    <div class="trade">
      <div class="price">
        应付金额:<span> ¥{{ trademoney }}.00</span>
      </div>
      <div class="receiveInfo">
        寄送至：<span class="info">{{ this.useraddress }}</span> 收货人：<span
          class="info"
          >{{ this.username }}</span
        >
        手机号码：<span>{{ this.userphone }}</span>
      </div>
    </div>
    <div class="sub clearFix">
      <a class="subBtn" @click.prevent="submitTrade">提交订单</a>
      <a class="cancelBtn" @click.prevent="cancelTrade">取消订单</a>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Trade",
  data() {
    return {
      // 顾客下单用户名
      username: "",
      // 顾客下单手机号
      userphone: "",
      // 顾客下单地址
      useraddress: "",
      // 顾客下单的商品
      tradegoodslist: [],
      // 顾客下单备注
      tradetip: "",
    };
  },
  computed: {
    // 获取用户信息和该用户的购物车信息
    ...mapState({
      userInfo: (state) => state.user.userInfo,
      cartgoods: (state) => state.goods.cartgoods,
    }),
    // 用户在购物车页面勾选的商品则是订单的商品
    tradegoods() {
      let tradegoods = [];
      this.cartgoods.forEach((cart, index) => {
        // 遍历查找处于勾选状态下的商品
        if (cart.checked) {
          tradegoods.push(cart);
        }
      });
      return tradegoods;
    },
    // 计算订单总金额
    trademoney() {
      let trademoney = 0;
      this.tradegoodslist.forEach((goods, index) => {
        trademoney += goods.price;
      });
      return trademoney;
    },
    // 计算属性，验证手机号是否合理
    phonePass() {
      // 手机号码由1开头，第二位是3，4，5，7，8的其中一个
      // 只要匹配的字符出现在方括号内，即可表示匹配成功
      // test 方法检查字符串是否与给出的正则表达式模式相匹配，如果是则返回 true，否则就返回 false。
      return /^[1][3,4,5,7,8][0-9]{9}$/.test(this.userphone);
    },
  },
  mounted() {
    // 首先默认的收货信息是用户的信息
    this.username = this.userInfo.usernickname || '';
    this.userphone = this.userInfo.userphone;
    this.useraddress = this.userInfo.useraddress;
    // 计算出来的结果赋值给订单商品
    this.tradegoodslist = this.tradegoods;
  },
  methods: {
    // 点击提交订单的事件回调
    async submitTrade() {
      if (!this.username || !this.userphone || !this.useraddress) {
        this.$message({
          type: "error",
          message: "您必须把收货信息填写完整！",
        });
        return;
      }
      this.$confirm("您是否确定下单?", "订单", {
        confirmButtonText: "确定",
        cancelButtonText: "我再想想",
        type: "warning",
      })
        .then(async () => {
          let res = await this.$store.dispatch("submitTradeInfo", {
            userid: this.userInfo.id,
            username: this.username,
            userphone: this.userphone,
            useraddress: this.useraddress,
            goodslist: this.tradegoodslist,
            tradetip: this.tradetip,
            trademoney: this.trademoney,
            tradetime: new Date().toLocaleString(),
            status: '等待处理'
          });
          if (res == "ok") {
            this.$store.dispatch("updateTradeGoodsCount", {
              goodslist: this.tradegoodslist,
            });
            this.$message({
              type: "success",
              message: "订单已经生成!",
            });

            // 根据订单中的商品id删掉购物车的对应商品
            for(let i = 0;i < this.tradegoodslist.length; i++){
              this.$store.dispatch('delCartAccordingtoTrade',{
                userid: this.userInfo.id,
                goodsid: this.tradegoodslist[i].goodsid
              })
            }
            this.$router.replace("/pay");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "该订单已取消提交",
          });
        });
    },
    // 点击取消订单的事件回调
    cancelTrade() {
      this.$confirm("是否确定取消订单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "取消成功!",
          });
          this.$router.replace("/shopcar");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "继续订单！",
          });
        });
    },
    // 验证手机号是否正确
    phoneRight(){
      if(!this.phonePass){
        this.$message({
          type: 'error',
          message: '该手机号码格式不正确！'
        })
        this.userphone = ''
      }
    }
  },
  watch: {
    $route() {
      // 路径变化，订单列表可能改变，要重新获取
      this.tradegoodslist = this.tradegoods;
    },
  },
};
</script>

<style lang="less" scoped>
.trade-container {
  .title {
    width: 1200px;
    margin: 0 auto;
    font-size: 14px;
    line-height: 21px;
  }

  .content {
    width: 1200px;
    margin: 10px auto 0;
    border: 1px solid rgb(221, 221, 221);
    padding: 25px;
    box-sizing: border-box;

    h3 {
      color: #e12228;
    }

    .detail {
      width: 1080px;
      background: rgba(0, 0, 0, 0.1);
      padding: 10px;
      margin: 2px auto 0;

      .list {
        display: flex;
        background-color: #fff;

        li {
          list-style: none;
          flex: 1;

          p {
            margin-bottom: 20px;
          }

          h4 {
            color: #c81623;
            font-weight: 400;
            font-size: 14px;
          }

          h3 {
            margin: 0;
            color: #e12228;
          }
        }

        .inlist {
          display: block;
          height: 100px;
          line-height: 100px;
          align-items: center;
          text-align: center;
        }
      }
    }

    .bbs {
      margin-bottom: 15px;

      h5 {
        line-height: 30px;
      }

      textarea {
        width: 100%;
        border-color: #e4e2e2;
        line-height: 1.8;
        outline: none;
        resize: none;
      }
    }
  }

  .trade {
    box-sizing: border-box;
    width: 1200px;
    padding: 10px;
    margin: 10px auto;
    text-align: right;
    background-color: #f4f4f4;
    border: 1px solid #ddd;

    div {
      line-height: 30px;
    }

    .price span {
      color: #e12228;
      font-weight: 700;
      font-size: 18px;
    }

    .receiveInfo {
      color: #999;

      .info {
        margin-right: 80px;
      }
    }
  }

  .sub {
    width: 1200px;
    margin: 0 auto 10px;

    .cancelBtn {
      float: right;
      width: 164px;
      height: 56px;
      font: 700 18px "微软雅黑";
      line-height: 56px;
      text-align: center;
      color: #fff;
      background-color: gray;
      cursor: pointer;
    }

    .subBtn {
      float: right;
      width: 164px;
      height: 56px;
      font: 700 18px "微软雅黑";
      line-height: 56px;
      text-align: center;
      color: #fff;
      background-color: #e1251b;
      cursor: pointer;
    }
  }
}
</style>