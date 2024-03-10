<template>
  <div class="pay-main">
    <div class="pay-container">
      <div class="checkout-tit">
        <h4>
          <span class="success-icon"></span>
          <span class="success-info"
            >（模拟支付）订单提交成功，将尽快为您发货~~</span
          >
        </h4>
      </div>
      <div class="checkout-steps">
        <h5>支付平台</h5>
        <div class="step-cont">
          <li><img src="./images/pay1.jpg" /></li>
        </div>
        <div class="hr"></div>
        <div class="submit">
          <a class="btn" @click="goToSales">支付完成，查看订单</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pay",
  methods: {
    goToSales(){
      this.$router.replace('/personal/sales')
    }
  }
};
</script>

<style lang="less" scoped>
.pay-main {
  margin-bottom: 20px;

  .pay-container {
    margin: 0 auto;
    width: 1200px;

    .orange {
      color: #e1251b;
      font-size: 18px;
    }

    .checkout-tit {
      padding: 10px;
      .success-icon {
        width: 30px;
        height: 30px;
        display: inline-block;
        background: url(./images/icon.png) no-repeat 0 0;
      }

      .success-info {
        padding: 0 8px;
        line-height: 30px;
        vertical-align: top;
        font-size: 18px;
      }
    }

    h4 {
      margin: 9px 0;
      font-size: 16px;
      line-height: 21px;
      color: #e1251b;
    }

    .checkout-steps {
      border: 1px solid #ddd;
      padding: 20px;

      .hr {
        height: 1px;
        background-color: #ddd;
      }

      .step-cont {
        margin: 0 10px 12px 20px;
        li {
          list-style: none;
        }
      }
    }

    .submit {
      text-align: center;

      .btn {
        display: inline-block;
        padding: 15px 45px;
        margin: 60px 0 10px;
        font: 18px "微软雅黑";
        font-weight: 700;
        border-radius: 0;
        background-color: #e1251b;
        border: 1px solid #e1251b;
        color: #fff;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        text-decoration: none;
      }
    }
  }
}
</style>