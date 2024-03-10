<template>
  <div id="home">
    <div id="container">
      <div class="homemain">
        <el-container>
          <!-- 侧边展示商品菜单 -->
          <el-aside style="width: 250px">
            <el-col >
            <div class="catelisttitle">
              <i class="el-icon-goods"></i>&nbsp;超市商品分类
            </div>
            <el-menu>
              <el-menu-item
                @click="getGoodsItem(cate.categoryId)"
                v-for="cate in homecategory"
                :key="cate.categoryId"
                index="cate.categoryId"
                class="verticalitem"
              >
                <i :class="cate.cateicon"></i>
                <span slot="title">{{ cate.catename }}</span>
              </el-menu-item>
            </el-menu>
          </el-col>
          </el-aside>

          <!-- 轮播图区域 -->
          <el-main>
            <el-carousel v-if="homecasual.length > 0" class="imgshow" height="32.5vw">
              <el-carousel-item v-for="casual in homecasual" :key="casual.id" >
                <img :src="casual.imgurl"/>
              </el-carousel-item>
            </el-carousel>
          </el-main>
        </el-container>
      </div>

      <!-- 公告展现板块 -->
      <div class="notice">
        <div class="noticetitle"><h3>---超市&公告---</h3></div>
        <div class="noticeshow">
          <el-card class="box-card" shadow="hover">
            <div class="text item">
              {{ notice }}
            </div>
          </el-card>
        </div>
      </div>

      <!-- 新品推荐板块 -->
      <div class="recommend">
        <div class="recommendtitle"><h3>---新品&推荐---</h3></div>
        <div class="recommendshow">
          <div class="cardpart">
            <ProductItem
              v-for="pro in recommendlist"
              :key="pro.goodsid"
              :pro="pro"
              class="pro"
            />
          </div>
        </div>
      </div>

      <!-- 随机展览板块 -->
      <div class="random">
        <div class="randomtitle">
          <h3>---好货&速览---</h3>
        </div>
        <div class="randomshow">
          <div class="cardpart">
            <ProductItem
              v-for="pro in randomGoodsList"
              :key="pro.goodsid"
              :pro="pro"
              class="pro"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ProductItem from "@/components/ProductItem";
export default {
  name: "Home",
  components: {
    ProductItem,
  },
  data() {
    return {
      // 公告信息
      notice: "",
      // 推荐的商品卡片
      recommendlist: [],
      // 随机获取的商品卡片信息
      randomGoodsList: []
    };
  },
  methods: {
    // 点击商品分类跳转
    getGoodsItem(categoryId) {
      // 这里采用的是params传参，带上参数跳转页面
      // categoryId表示分类，1表示初始的页码
      this.$router.replace(`/search/${categoryId}/1`);
    },
    // 获取公告信息
    async getNoticeInfo() {
      try {
        let noticeinfo = await this.$store.dispatch("getNoticeInfo");
        if (noticeinfo != "null") {
          this.notice = noticeinfo[0].notice;
        }
      } catch (error) {
        this.notice = "------暂无公告信息------";
      }
    },
    // 获取推荐商品卡片
    async getRecommend() {
      let result = await this.$store.dispatch("getRecommend");
      this.recommendlist = result;
    },
    // 随机获取商品信息进行展示
    async getRandomGoods(){
      // 先清除旧存储的
      this.randomGoodsList = []
      let result = await this.$store.dispatch('getRandomGoods')
      this.randomGoodsList = result
    }
  },
  computed: {
    // 从仓库里获取轮播图信息、商品分类信息、用户登录信息
    ...mapState({
      // 辅助函数写法，这样就可以直接用，不用写this.$store
      homecasual: (state) => state.home.homecasual,
      homecategory: (state) => state.home.homecategory,
      userInfo: (state) => state.user.userInfo,
    }),
  },
  mounted() {
    // 一挂载就获取轮播图数据
    this.$store.dispatch("getHomeCasual");
    // 一挂载就获取首页商品分类
    this.$store.dispatch("getCategory");
    if (this.userInfo && this.userInfo.id) {
      let userid = this.userInfo.id;
      this.$store.dispatch("getShopCartData", { userid });
    }
    // 一挂载就获取公告信息
    this.getNoticeInfo();
    // 一挂载就获取推荐商品卡片
    this.getRecommend();
    // 一挂载就随机获取商品信息进行展示
    this.getRandomGoods()
  },
};
</script>

<style scoped>
/* home主页信息的大框 */
#home {
  font-family: "Microsoft YaHei";
  height: 1900px;
}

#container {
  background: rgba(245, 245, 245, 0.5);
  margin: 20px auto;
  height: 100%;
}

/*产品展示、购买、分类简介区*/
.homemain {
  background-color: white;
  width: 80%;
  height: 500px;
  margin: 0 auto;
  border: 1px solid #ccc;
}

.el-aside {
  background-color: #e9eef3;
  border-right: 1px solid #ccc;
}

.homemain >.el-container{
  height: 100%;
}

.catelisttitle {
  width: 100%;
  height: 60px;
  color: white;
  line-height: 60px;
  font-weight: bold;
  font-size: 18px;
  background: green;
  text-align: left;
  text-indent: 10px;
}

.el-menu {
  background-color: #e9eef3;
  height: 300px;
}

.el-menu .el-menu-item {
  font-size: 17px;
  font-weight: bold;
  color: black;
  text-align: left;
  line-height: 55px;
}


/*自动播放图片区域*/
.el-main {
  padding: 0;
}

.el-main > .imgshow {
  width: 100%;
  height: 100%;
}

img {
  width: 100%;
  overflow: hidden;
  height: auto;
}


/* 公告栏板块 */
.notice {
  width: 80%;
  height: 200px;
  margin: 50px auto;
}

.notice > .noticetitle {
  width: 100%;
  height: 20px;
  text-align: center;
  font-weight: normal;
  color: black;
  font-size: 22px;
  line-height: 20px;
  margin-bottom: 20px;
}

.noticetitle > h3 {
  display: inline-block;
}

.notice > .noticeshow {
  width: 80%;
  height: 100px;
  background-color: white;
  margin: 50px auto;
  border-radius: 20%;
}

.text {
  font-size: 15px;
  text-indent: 2em;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 100%;
  border-radius: 20%;
}

/* 商品推荐和商品速览板块 */
.recommend .random{
  width: 80%;
  height: 400px;
  margin: 0 auto;
}

.recommend > .recommendtitle {
  width: 100%;
  height: 20px;
  text-align: center;
  font-weight: normal;
  color: black;
  font-size: 22px;
  line-height: 20px;
  margin-bottom: 20px;
}

.recommendtitle > h3 {
  display: inline-block;
}

.recommend > .recommendshow {
  width: 100%;
  height: 250px;
  margin: 50px auto;
  justify-content: space-between;
}

.cardpart {
  display: flex;
  justify-content: center;
}

.cardpart > .pro {
  position: relative;
  width: 300px;
  height: 220px;
  margin: 12px;
  border: 1px solid gainsboro;
}


/* 商品速览板块 */
.random {
  margin-top: 100px;
  height: 700px;
}

.randomtitle
{
  width: 100%;
  height: 20px;
  text-align: center;
  font-weight: normal;
  color: black;
  font-size: 22px;
  line-height: 20px;
  margin-bottom: 20px;
}

.random > .randomshow {
  width: 80%;
  height: 250px;
  margin: 30px auto;
  justify-content: space-between;
  
}

.randomshow > .cardpart {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

</style>