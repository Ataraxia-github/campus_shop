<template>
  <!-- 底部 -->
  <div class="footer">
    <div class="maincontainer">
      <div class="copyright">
        <ul class="footparttop">
          <li>
            <router-link to="/home">超市主页</router-link>
            <span class="verticalline"></span>
          </li>
          <li>
            <a href="https://www.bilibili.com/">哔哩哔哩大学</a>
            <span class="verticalline"></span>
          </li>
          <li>
            <a href="https://www.csdn.net/">CSDN大学</a>
            <span class="verticalline"></span>
          </li>
        </ul>
        <p>地址：广州大学城XXX校园生活超市</p>
        <p>联系电话：020-XXXXXXXXX</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderFoot",
};
</script>

<style scoped lang="less">
.footer {
  background-color: #eaeaea;

  .maincontainer {
    width: 1200px;
    margin: 0 auto;
    padding: 0 15px;


    .copyright {
      padding: 20px;

      .footparttop {
        text-align: center;

        li {
          display: inline;
          a{
            text-decoration: none;
            color: #666;
          }
          .verticalline {
            border-left: 1px solid #666;
            width: 1px;
            height: 13px;
            background: #666;
            margin: 8px 18px;
          }
        }
      }

      p {
        margin: 10px 0;
        text-align: center;
        font-size: 15px;
      }
    }
  }
}
</style>