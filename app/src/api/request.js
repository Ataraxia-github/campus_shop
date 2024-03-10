//对于axios进行二次封装
import axios from "axios";
//引入进度条
import nprogress from "nprogress";
//引入进度条的样式
import "nprogress/nprogress.css";


//1.利用axios对象的方法create，去创建一个axios实例
//2.requests就是axios，只不过稍微配置一下
const requests = axios.create({
    //配置对象
    //基础路径，发请求的时候，路径当中会出现 api
    baseURL: "/api",
    //代表请求超时的时间5秒
    timeout: 5000,
});

// 服务器真实地址，专门拼接get请求中url路径的query参数
const Server_URL = 'http://localhost:8000';  


//请求拦截器，在发送请求之前，请求拦截器可以检测到，可以在请求发出前做一些事情
requests.interceptors.request.use((config) => {
    //config：配置对象，对象里面有一个重要的属性，headers请求头
    //进度条开始动
    nprogress.start();
    return config;
});

//响应拦截器
requests.interceptors.response.use((res) => {
    //响应成功的回调函数，服务器响应数据回来之后，响应拦截器可以检测到，可以做一些事情
    //进度条结束
    nprogress.done();
    return res.data;
}, (error) => {
    console.log(error);
    //响应失败的回调函数
    return Promise.reject(new Error('false'));
});


// 专门处理携带query参数的get请求，query参数必须写在路径中
function HandleQuery(url = '', params = {}, type = 'GET') {
    // 1. 定义promise对象
    let promise;

    return new Promise((resolve, reject) => {
      // 2. 处理get请求
      if ('GET' === type) {
        // 2.1 拼接请求字符串
        let paramsStr = '';
        Object.keys(params).forEach(key => {
          paramsStr += key + '=' + params[key] + '&'
        });
        // 2.2 过滤最后的&
        if (paramsStr !== '') {
          paramsStr = paramsStr.substr(0, paramsStr.lastIndexOf('&'))
        }
        // 2.3 完整路径
        url += '?' + paramsStr;
        // 2.4 发送get请求
        promise = axios.get(url)
      } 

      // 3. 返回请求的结果
      promise.then((response) => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  }



//对外暴露
export {
    requests,
    HandleQuery,
    Server_URL
};