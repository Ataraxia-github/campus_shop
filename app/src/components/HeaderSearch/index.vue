<template>
  <div class="maincontainer">
    <div class="imgdiv"><img src="@/pages/Home/img/homeicon.jpg" alt=""></div>
    <div class="searchscope">
      <div>
        <input type="text" placeholder="这里可以搜索你所心仪的商品..." v-model="keywords" />
        <el-button
          type="success"
          icon="el-icon-search"
          @click="postSearch"
        ></el-button>
      </div>
    </div>
    <div class="shopcart">
      <a @click.prevent="goShopCar"
        ><i class="el-icon-shopping-cart-1"></i>&nbsp;&nbsp;查看我的购物车</a
      >
    </div>
  </div>
</template>

<script>
import { MessageBox } from "element-ui";
import { mapState } from "vuex";
export default {
  name: "HeaderSearch",
  data() {
    return {
      // 用户搜索输入的关键词
      keywords: '',
    };
  },
  computed: {
    // 获取登录的用户信息
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
  },
  methods: {
    // 进行商品搜索功能
    postSearch() {
      if(this.keywords){
        let keywords = this.keywords
        this.$store.dispatch('goToSearch',{keywords})
        this.$router.replace("/searchdetail");
      }
      // 搜索后，对输入框的关键词进行清空
      this.keywords = ''
    },
    // 点击查看购物车
    goShopCar() {
      if (this.userInfo.id) {
        this.$router.replace("/shopcar");
      } else {
        // 如果没登录的话，无法查看购物车
        MessageBox({
          type: "info",
          message: "请先登录!",
          showClose: true,
        });
      }
    },
  },
};
</script>

<style scoped>
/*头部搜索区*/
.maincontainer {
  /* 相对定位 */
  position: relative;
  width: 100%;
  height: 140px;
}
/* 左上角存放图片的框 */
.imgdiv{
  position: absolute;
  width: 145px;
  height: 125px;
  left: 5%;
  top: 15px;
  border-radius: 50%;
}
/* 左上角的图片 */
.imgdiv img{
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
/* 搜索框的位置 */
.searchscope {
  /* 子绝父相 */
  position: absolute;
  left: 50%;
  margin-left: -120px;
  margin-top: 60px;
}
/* 搜索框后面的小框 */
.searchscope div {
  display: flex;
  align-items: center;
}
/* 搜索部分的输入框 */
.searchscope input {
  padding-left: 10px;
  width: 480px;
  height: 35px;
  font-size: 14px;
  line-height: 35px;
  border: 2px solid green;
  /* 输入框右边无边框 */
  border-right: none;
  outline: none;
  box-sizing: border-box;
}
/* 输入框后面的小方框放置一个搜索图标 */
.searchscope button.el-button.el-button--success {
  padding: 0;
  width: 50px;
  height: 35px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  border-radius: 0;
  outline: none;
  display: flex;
  /* 居中对齐 */
  justify-content: center;
  /* 垂直对齐 */
  align-items: center;
  border: 1px solid green;
  box-sizing: border-box;
}

/*头部的购物车标记区域*/
.maincontainer > .shopcart {
  position: absolute;
  margin-top: 90px;
  right: 30px;
  width: 160px;
  height: 35px;
  text-align: center;
  line-height: 35px;
  font-size: 15px;
  background: #f8f9fa;
  color: green;
  cursor: pointer;
}
/* 购物车方块里的文字信息 */
.shopcart > a {
  font-size: 14px;
  color: green;
  text-decoration: none;
}
</style>