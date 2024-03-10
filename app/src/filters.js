// 过滤器
import Vue from  'vue'

// 人民币过滤器，显示价格的格式，两位小数
Vue.filter('moneyFormat', (value)=>{
    return '¥' + Number(value).toFixed(2);
});


// 时间戳过滤器，数据库存储DateTime格式，稍作处理才能正常显示
Vue.filter('dateFormat', (dataStr) => {
    var time = new Date(dataStr);
    function timeAdd0(str) {
      if (str < 10) {
        str = '0' + str;
      }
      return str
    }
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y + '-' + timeAdd0(m) + '-' + timeAdd0(d) + ' ' + timeAdd0(h) + ':' + timeAdd0(mm) + ':' + timeAdd0(s);
})
