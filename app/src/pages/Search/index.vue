<template>
  <div v-if="this.$route.path.indexOf('/goods') === -1">
    <div id="container">
      <div class="product">
        <div class="showtop">
          <!-- 标题展示当前类 -->
          <h3 v-if="this.homecategory.length">
            &nbsp;{{ this.homecategory[this.currentCate - 1].catename }}&nbsp;
          </h3>
          <!-- @command是指令事件，点击菜单项触发事件回调 -->
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link"
              >其他类别<i class="el-icon-arrow-down el-icon--right"></i
            ></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="cate in homecategory"
                :key="cate.categoryId"
                :command="cate.categoryId"
                >{{ cate.catename }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="showmain">
          <!-- 展示商品卡片，props传值 -->
          <ProductItem
            v-for="goods in catetogoodsitem"
            :key="goods.goodsid"
            :pro="goods"
            class="pro"
          />
        </div>
      </div>
    </div>
    <div id="footer">
      <ul class="pagination">
        <li><a @click="JumpPage(currentIndex - 1)">«</a></li>
        <li>
          <a
            v-for="index in catePages[this.currentCate - 1]"
            :key="index"
            :class="{ currentpage: currentIndex === index }"
            @click="JumpPage(index)"
            >{{ index }}</a
          >
        </li>
        <li><a @click="JumpPage(currentIndex + 1)">»</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ProductItem from "@/components/ProductItem";
export default {
  name: "Search",
  data() {
    return {
      // 当前的页码
      currentIndex: 1,
      // 当前的分类
      currentCate: 1,
      // 每一页展示的商品数
      pageSize: 6,
    };
  },
  components: {
    ProductItem,
  },
  computed: {
    // 从仓库里拿值
    ...mapState({
      userInfo: (state) => state.user.userInfo,
      homecategory: (state) => state.home.homecategory,
      catetogoodsitem: (state) => state.home.catetogoodsitem,
      total: (state) => state.home.homecategory.catecounts,
    }),
    // 计算需要多少页才能展示各个分类下的所有商品
    catePages() {
      // 用一个数组存放各个分类所需的页码数
      let arr = [];
      // 计算出每个商品分类需要多少页码展示
      this.homecategory.forEach((cate, index) => {
        let page = Math.ceil(cate.catecounts / this.pageSize);
        arr.push(page);
      });
      return arr;
    },
  },
  // 在挂载DOM之前把参数都整理好，发送请求，再呈现页面
  mounted() {
    // 请求商品分类数据
    this.$store.dispatch("getCategory");
    this.getData();
  },
  methods: {
    // 发送请求拿数据
    async getData() {
      // 整理参数，query参数是字符串，转变成数字类型
      this.currentCate = Number(this.$route.params.id) || 1;
      this.currentIndex = Number(this.$route.params.pageNo) || 1;
      // 根据用户点击的页码数据派发action，发请求
      this.$store.dispatch("getCategoryToGoods", {
        category: this.currentCate,
        pageNo: this.currentIndex,
        pageSize: this.pageSize,
      });
      // 请求当前用户信息
      this.$store.dispatch("getUserInfo");
    },

    // 点击下拉菜单触发事件回调
    handleCommand(command) {
      this.$store.dispatch("getCategoryToGoods", {
        category: command,
        pageNo: 1,
        pageSize: this.pageSize,
      });
      // 点击其他分类，再次发请求查询数据
      this.$router.replace(`/search/${command}/1`);
      this.currentCate = command;
      this.currentIndex = 1;
    },
    // 分页器事件回调
    JumpPage(index) {
      // 在有效的分页器范围内才能有这个事件
      if (index && index <= this.catePages[this.currentCate - 1]) {
        this.$store.dispatch("getCategoryToGoods", {
          category: this.currentCate,
          pageNo: index,
        });
        this.currentIndex = index;
        this.$router.replace(
          `/search/${this.currentCate}/${this.currentIndex}`
        );
      }
    },
  },
  watch: {
    //监听属性，路由路径一变化就可以发请求
    $route() {
      try {
        this.getData();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
#container {
  position: relative;
  margin: 30px auto;
  width: 100%;
}
.product {
  margin: 0 auto;
  width: 1200px;
}
.product > .showtop {
  margin-bottom: 20px;
  width: 1000px;
  height: 80px;
  line-height: 50px;
  font-size: 26px;
  font-weight: bold;
  color: #222;
}
.showtop > h3 {
  display: inline-block;
  font-size: 1.75rem;
  margin-bottom: 2rem;
  font-weight: 500;
  line-height: 50px;
  margin-top: 0;
  margin-right: 30px;
  font-size: 1.2em;
  border-radius: 20%;
  /* 渐变背景 */
  background-image: linear-gradient(
    to right,
    rgba(255, 0, 0, 0),
    rgb(164, 202, 252)
  );
}
.el-dropdown-link {
  display: inline-block;
  cursor: pointer;
  color: rgb(134, 187, 255);
}
.el-icon-arrow-down {
  font-size: 12px;
}

/* 商品展示区域 */
.product > .showmain {
  margin: 0 auto;
  padding-left: 20px;
  width: 1000px;
  height: 500px;
}
/* 每一张商品卡片 */
.showmain > .pro {
  position: relative;
  float: left;
  margin-right: 30px;
  margin-bottom: 20px;
  width: 300px;
  height: 220px;
  border: 1px solid gainsboro;
}


/* 底部分页器 */
#footer {
  height: 50px;
  width: 100%;
  display: flex;
}
#footer > ul.pagination {
  margin: 0 auto;
}
ul.pagination li {
  float: left;
  list-style: none;
  cursor: pointer;
}
ul.pagination li a {
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  color: black;
  border: 1px solid #ddd;
}
ul.pagination li a.currentpage {
  background-color: green;
  color: white;
  border: 1px solid green;
}
/* 除了选中的元素之外的其他元素才会有悬浮效果 */
ul.pagination li a:hover:not(.currentpage) {
  background-color: #ddd;
}
</style>