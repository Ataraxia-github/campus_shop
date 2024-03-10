// 管理所有接口信息
import express from 'express';
var router = express.Router();

import db from '../db/db.js'
// 引入加密模块
import md5 from 'blueimp-md5'

// 接收表单数据的模块
import formidable from 'formidable'
import {
    basename,
    join
} from 'path'
// 这里要再引一次，否则下面引用__dirname报错
import path from 'path';
// __dirname 总是指向被执行 js 文件的绝对路径
const __dirname = path.resolve();
// 加盐,在密码的特定位置插入特定字符串后，再进行md5运算
const S_KEY = '@WaLk1314?.ItikE.Com.#';

import {
    randomCode,
    sendCode
} from '../utils/getmessage.js'



router.get('/', function (req, res, next) {
    res.send('服务器成功启动！！');
});

// 获取手机验证码
router.post('/getphonecode', (req, res) => {
    // 收集前端传来的手机号码
    let phonenum = req.body.phone
    // 随机产生六位数的手机验证码
    let code = randomCode(6)
    // 得到的这个验证码后期还得验证用户输入得对不对，要存起来
    req.session.phonecode = code
    sendCode(phonenum, code, function (success) {
        if (success) {
            res.json({
                successcode: 200,
                message: '短信验证码发送成功！'
            })
        } else {
            res.json({
                errcode: 0,
                message: '短信验证码发送失败！'
            })
        }
    })

})

// 获取首页轮播图
router.get('/homecasual', (req, res) => {
    let str = 'select * from homecasual'
    db.query(str, (err, results) => {
        if (err) {
            res.json({
                errcode: 0,
                message: '请求轮播图数据失败！'
            })
        } else {
            results = JSON.parse(JSON.stringify(results))
            res.json({
                successcode: 200,
                message: results
            })
        }
    })
})

// 获取首页商品分类数据
router.get('/category', (req, res) => {
    let str = 'select * from category'
    db.query(str, (err, results) => {
        if (err) {
            res.json({
                errcode: 0,
                message: '请求商品分类数据失败！'
            })
        } else {
            results = JSON.parse(JSON.stringify(results))
            res.json({
                successcode: 200,
                message: results
            })
        }
    })
})

// 获取首页公告信息
router.get('/getnoticeinfo',(req,res)=>{
    let str = 'select * from notice '
    db.query(str,(err,results)=>{
        if(!err){
            results = JSON.parse(JSON.stringify(results))
            // 数据库里没有公告信息
            if(!results){
                res.json({
                    errcode: 101,
                    message: '暂无公告信息'
                })
            }else{
                res.json({
                    successcode: 200,
                    message: results
                })
            }
        }
    })
})

// 获取首页推荐的三个商品卡片
router.get('/getrecommendlist',(req,res)=>{
    let str = 'select * from homerecommend'
    db.query(str,(err,results)=>{
        if(!err){
            results = JSON.parse(JSON.stringify(results))
            res.json({
                successcode: 200,
                message: results
            })
        }
    })
})

// 点击首页商品分类展示商品卡片
router.get('/categorytogoods', (req, res) => {
    // 获取参数，知道用户点击的是哪个分类数据
    // 查询需要三个参数，哪个分类，哪一页，一页要展示多少个
    let category = req.query.category || 1
    let pageNo = req.query.pageNo || 1
    let pageSize = req.query.pageSize || 6
    //……limit (start-1)*pageSize,pageSize; 其中start是页码，pageSize是每页显示的条数。
    let str = 'select * from goods where category = ' + category + ' limit ' + (pageNo - 1) * pageSize + ',' + pageSize

    db.query(str, (err, results) => {
        if (err) {
            console.log(err);
            res.json({
                errcode: 0,
                message: '查询商品数据失败！'
            })
        } else {
            results = JSON.parse(JSON.stringify(results))
            res.json({
                successcode: 200,
                message: results
            })
        }
    })
})

// 从数据库中随机取出商品进行展示
router.get('/randomgoods',(req,res)=>{
    // 随机抽出三种商品
    let str = 'select * from goods where goodsid >= ((select max(goodsid) from goods) - (select min(goodsid) from goods)) * rand() + (select min(goodsid) from goods) limit 6'
    db.query(str,(err,results)=>{
        if(err){
            console.log(err);
            res.json({
                errcode: 0,
                message: '服务器内部错误!'
            })
        }else {
            res.json({
                successcode: 200,
                message: results
            })
        }
    })
})

// 获取商品详细信息
router.get('/goodsdetail', (req, res) => {
    // 得到用户申请查看的是哪个商品的数据
    let goodsNo = req.query.goodsNo
    let str = 'select * from goods where goodsid = ' + goodsNo
    db.query(str, (err, results) => {
        if (err) {
            res.json({
                errcode: 0,
                message: '商品详情信息获取失败'
            })
        } else {
            results = JSON.parse(JSON.stringify(results))
            res.json({
                successcode: 200,
                message: results
            })
        }
    })
})

// 获取商品的评价信息
router.post('/getcomment',(req, res) => {
    let goodsid = req.body.goodsid
    let str = 'select * from comment where goodsid = '+ goodsid
    db.query(str,(err,results)=>{
        if(err){
            console.log(err);
            res.json({
                errcode: 0,
                message: '服务器内部错误！'
            })
        }else{
            results = JSON.parse(JSON.stringify(results))
            // 没有评价
            if(!results[0]){
                res.json({
                    errcode: 101,
                    message: '商品暂无评价信息'
                })
            }else{
                res.json({
                    successcode: 200,
                    message: results
                })
            }
        }
    })
})

// 添加商品到购物车
router.post('/addshopcart', (req, res) => {
    // 登录了才能添加到购物车
    let userid = req.body.userid
    if (!userid) {
        // 没有用户id说明未登录
        res.json({
            errcode: 0,
            message: '非法用户！'
        })
        return
    }
    // 获取客户端传过来的商品信息
    let goodsid = req.body.goodsid
    let goodsname = req.body.goodsname
    let goodsurl = req.body.goodsurl
    let price = req.body.price
    let buycount = req.body.buynum
    let counts = req.body.counts
    // 同个用户不能重复添加同个商品到购物车
    let str = 'select * from cart where goodsid = ' + goodsid + ' and userid = ' + userid + ' limit 1'
    db.query(str, (err, results) => {
        if (err) {
            res.json({
                errcode: 0,
                message: '查询出现错误！请稍后再试！'
            })
        }
        // 查询没出错
        else {
            results = JSON.parse(JSON.stringify(results))
            if (results[0]) {
                // 在数据库中查询到数据，说明商品已经存在
                res.json({
                    errcode: 1,
                    message: '该商品已在购物车中！不能重复添加！'
                })
            } else {
                // 商品不在购物车内
                let cartgoods = {
                    goodsid,
                    goodsname,
                    goodsurl,
                    price,
                    buycount,
                    userid,
                    counts
                }
                let str1 = 'insert into cart set ?'
                db.query(str1, cartgoods, (err, results) => {
                    if (err) {
                        res.json({
                            errcode: 2,
                            message: '加入购物车失败！'
                        })
                    } else {
                        res.json({
                            successcode: 200,
                            message: '加入购物车成功！'
                        })
                    }
                })
            }
        }
    })
})

// 查询购物车的商品
router.get('/watchshopcart', (req, res) => {
    // 获取参数
    let userid = req.query.userid
    let str = 'select * from cart where userid = ' + userid
    db.query(str, (err, results) => {
        if (err) {
            res.json({
                errcode: 0,
                message: '请求购物车商品数据失败！'
            })
        } else {
            res.json({
                successcode: 200,
                message: results
            })
        }
    })
})

// 删除购物车单条商品
router.post('/deletecartgoods', (req, res) => {
    let goodsid = req.body.goods.goodsid
    let userid = req.body.userid
    let str = 'delete from cart where goodsid = ' + goodsid + ' and userid = ' + userid
    db.query(str, (err, results) => {
        if (err) {
            console.log(err);
            res.json({
                errcode: 0,
                message: '删除失败！'
            })
        } else {
            res.json({
                successcode: 200,
                message: '删除成功！'
            })
        }
    })
})

// 清空购物车
router.post('/clearcartallgoods', (req, res) => {
    let userid = req.body.userid
    let str = 'delete from cart where userid = ' + userid
    db.query(str, (err, results) => {
        if (err) {
            res.json({
                errcode: 0,
                message: '清空购物车失败！'
            })
        } else {
            res.json({
                successcode: 200,
                message: '清空购物车成功！'
            })
        }
    })
})

// 修改商品数量，用户在购物车页面还可以变更购买数量，这个数量由库存决定
router.post('/changegoodscount', (req, res) => {
    // 获取数据
    let goodsid = req.body.goods.goodsid
    let buycount = req.body.count
    let userid = req.body.userid
    let str = 'update cart set buycount = ? where goodsid = ' + goodsid + ' and userid = ' + userid
    let params = {
        buycount
    }
    db.query(str, params, (err, results) => {
        if (err) {
            res.json({
                errcode: 0,
                message: '修改商品数量失败！'
            })
        } else {
            res.json({
                successcode: 200,
                message: '修改商品数量成功！'
            })
        }
    })
})

// 用户名和密码登录
router.post('/userlogin', (req, res) => {
    // 解构，获取用户输入的数据
    let username = req.body.username
    // 两次md5加密处理，其中有一次加盐
    let userpwd = md5(md5(req.body.userpwd) + S_KEY)
    // 解析出来一个对象，该对象没有原型，下面几行是解决出现[Object: null prototype]的问题
    if (req.body.__proto__ === undefined) {
        Object.setPrototypeOf(req.body, new Object());
    }

    // 查询数据是否匹配
    let str = "select * from userinfo where username = '" + username + "' limit 1";
    db.query(str, (err, results) => {
        if (err) {
            res.json({
                errcode: 0,
                message: '请检查您的用户名是否输入正确！'
            })
        } else {
            results = JSON.parse(JSON.stringify(results))
            // 查不到数据，根本没注册过
            if (!results[0]) {
                res.json({
                    errcode: 1,
                    message: '该用户名不存在！'
                })
            }
            // 查找了一条数据，说明用户确实已存在
            else if (results[0]) {
                if (results[0].userpwd !== userpwd) {
                    res.json({
                        errcode: 2,
                        message: '密码不正确！'
                    })
                } else {
                    // 登录成功，session记录一下用户id，以后根据这个userId，可以查询用户信息
                    req.session.userId = results[0].id;
                    // 登录之后，要记录下登录用户的信息
                    res.json({
                        successcode: 200,
                        data: {
                            id: results[0].id,
                            username: results[0].username || '',
                            usernickname: results[0].usernickname || '',
                            userphone: results[0].userphone || '',
                            usersex: results[0].usersex || '',
                            useraddress: results[0].useraddress || '',
                            useravatar: results[0].useravatar || ''
                        },
                        message: '登录成功！'
                    })
                }
            }
        }
    })
})

// 用户注册
router.post('/userregister', (req, res) => {
    let username = req.body.username
    // 加密存储
    let userpwd = md5(md5(req.body.userpwd) + S_KEY)
    let str = "select * from userinfo where username = '" + username + "' limit 1";
    // 用户名要唯一，先查找数据库有没有重名的用户名
    db.query(str, (err, results) => {
        if (err) {
            // 数据库查询错误
            res.json({
                errcode: 0,
                message: '注册失败！'
            })
        } else {
            // 数据库查询成功
            results = JSON.parse(JSON.stringify(results));
            if (results[0]) {
                // 数据库已有一条数据，说明该用户名已被注册
                res.json({
                    errcode: 1,
                    message: '该用户名已被占用！'
                })
            } else {
                // 数据库没数据，用户名可用，插入数据库
                const str1 = "insert into userinfo(username, userpwd) values (?, ?)";
                const params = [username, userpwd];
                db.query(str1, params, (err, results) => {
                    results = JSON.parse(JSON.stringify(results));
                    // req.session.userId = results[0].id
                    res.json({
                        successcode: 200,
                        message: '注册成功！'
                    })
                })
            }
        }
    })
})

// 个人中心根据判断session中有没有用户id，获取用户信息
router.get('/userinfo', (req, res) => {
    let userId = req.query.userid || req.session.userId
    let str = 'select * from userinfo where id = ' + userId + ' limit 1'
    db.query(str, (err, results) => {
        if (err) {
            res.json({
                errcode: 0,
                message: '获取用户数据失败！'
            })
        } else {
            results = JSON.parse(JSON.stringify(results))
            if (!results[0]) {
                // 查不到数据，说明没登录
                delete req.session.userId
                res.json({
                    errcode: 1,
                    message: '请确保您是登录状态！'
                })
            } else {
                // 已经检测到有session信息了，说明已经登录了
                res.json({
                    successcode: 200,
                    data: {
                        id: results[0].id,
                        username: results[0].username || '',
                        usernickname: results[0].usernickname || '',
                        userphone: results[0].userphone || '',
                        usersex: results[0].usersex || '',
                        useraddress: results[0].useraddress || '',
                        useravatar: results[0].useravatar || ''
                    },
                    message: '个人信息获取成功！'
                })
            }
        }
    })
})

// 退出登录
router.get('/userlogout', (req, res) => {
    // 清除session信息
    delete req.session.userId
    res.json({
        successcode: 200,
        message: '退出登录成功！'
    })
})

// 模糊搜索
router.post('/searchgoods', (req, res) => {
    // 获取携带过来的params参数
    let keywords = req.body.keywords
    // 正则表达式，把非文字字符换成空格
    // \s表示空格、水平制表符、垂直制表符、换行符等
    //  +号表示至少出现一次， /g表示全局
    keywords = keywords.replace(/\s+/g, ' ')
    // 把开头或是结尾的空格删掉
    // ^匹配开头，$匹配结尾，*表示出现任意次数，| 表示管道
    keywords = keywords.replace(/(^\s*)|(\s*$)/g, '')
    // 以空格作为划分
    let keyArr = keywords.split(' ')
    let str = 'select * from goods where goodsname or shortname like '
    // 第一个参数是遍历的数组内容，第二个参数是对应的数组索引，第三个参数是数组本身
    keyArr.forEach((item, index, arr) => {
        str += "'%" + item + "%'"
        if (index != arr.length - 1) {
            str += " or goodsname or shortname like "
        }
    })
    db.query(str, (err, results) => {
        results = JSON.parse(JSON.stringify(results))
        if (!results.length) {
            res.json({
                errcode: 0,
                message: '搜索失败！'
            })
        } else if (!err && results.length) {
            res.json({
                successcode: 200,
                message: results
            })
        }
    })
})

// 提交订单
router.post('/tradeinfo', (req, res) => {
    // 收集参数
    // 用户id，用户名，手机号，地址，下单的商品，订单金额
    let {
        userid,
        username,
        userphone,
        useraddress,
        tradetip,
        trademoney,
        tradetime,
        status
    } = req.body
    let goodslist = JSON.stringify(req.body.goodslist)
    let str = 'insert into trade set ?'
    let params = {
        userid,
        username,
        userphone,
        useraddress,
        tradetip,
        trademoney,
        tradetime,
        goodslist,
        status
    }
    db.query(str, params, (err, results) => {
        if (err) {
            res.json({
                errcode: 0,
                message: '服务器内部繁忙，请稍后再试！'
            })
        } else {
            // 订单成功写入服务器
            // 相应商品的库存要更新
            res.json({
                successcode: 200,
                message: '订单生成成功！'
            })
        }
    })
})

// 订单生成成功，更新相应商品的库存信息
router.post('/updatetradegoodscount', (req, res) => {
    // 收集前端传来的订单信息
    let goodslist = req.body.goodslist
    // 从数组中解构出相应的商品id，购买数量，库存数量
    for (let {
            goodsid,
            buycount,
            counts
        } of goodslist) {
        let str = 'update goods set counts = ' + (counts - buycount) + ' where goodsid = ' + goodsid
        // 更新之前用户购物车数据里的库存
        let str2 = 'update cart set counts = ' + (counts - buycount) + ' where goodsid = ' + goodsid
        db.query(str)
        db.query(str2)
    }
    goodslist = []
    res.send('success')
})

// 订单生成后，购买成功的商品从购物车中删除
router.post('/delcartaccordingtotrade',(req,res) => {
    let {goodsid,userid} = req.body
    let str = 'delete from cart where goodsid = ' + goodsid + ' and userid = ' + userid
    db.query(str,(err,results)=>{
        if(!err){
            res.json({
                successcode: 200,
                message: '购物车更新成功！'
            })
        }else{
            console.log(err);
        }
    })
})

// 根据订单编号查看订单具体信息
router.post('/gettradedetail', (req, res) => {
    let tradeId = req.body.tradeId
    let str = 'select goodslist from trade where tradeId = ' + tradeId
    db.query(str, (err, results) => {
        if (err) {
            res.json({
                errcode: 0,
                message: '服务器繁忙，请稍后再试！'
            })
        } else {
            results = JSON.parse(JSON.stringify(results))
            res.json({
                successcode: 200,
                message: results
            })
        }
    })
})

// 点击处理订单
router.post('/handletradestatus',(req,res)=>{
    let tradeId = req.body.tradeId 
    let str = "update trade set status = '已处理' where tradeId = " + tradeId
    db.query(str,(err,results)=>{
        if(err){
            console.log(err);
        }else{
            res.json({
                successcode: 200,
                message: '订单状态更新成功！'
            })
        }
    })
})

/* 
---------用户个人中心模块----------------
*/

// 用户修改密码
router.post('/editpassword', (req, res) => {
    let userid = req.body.userid
    // 原密码加密验证是否正确
    let oripassword = md5(md5(req.body.oripassword) + S_KEY)
    // 新密码加密存储
    let newpassword = md5(md5(req.body.newpassword) + S_KEY)
    let str = 'select * from userinfo where id = ' + userid
    db.query(str, (err, results) => {
        if (err) {
            res.json({
                errcode: 0,
                message: '查询失败！'
            })
        } else {
            results = JSON.parse(JSON.stringify(results))
            if (results[0]) {
                // 该用户存在，比对密码是否正确
                if (oripassword == results[0].userpwd) {
                    let str1 = 'update userinfo set userpwd = ? where id = ' + userid
                    db.query(str1, [newpassword], (err, results) => {
                        if (!err) {
                            res.json({
                                successcode: 200,
                                message: '密码修改成功！'
                            })
                        }
                    })
                } else if (oripassword != results[0].userpwd) {
                    res.json({
                        errcode: 101,
                        message: '初始密码输入不正确！'
                    })
                }
            }
        }
    })
})

// 用户修改个人信息
router.post('/edituserinfo', (req, res) => {
    // 获取前端收集来的表单数据
    let form = new formidable.IncomingForm()
    // form.encoding='utf-8'
    // 用户上传的头像存放的地方，绝对路径要写全
    form.uploadDir = join(__dirname, './public/useravatar')
    // 保留文件的原始扩展名
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            return next(err);
        }
        // 解构出表单携带的数据
        let id = fields.userid
        let usernickname = fields.usernickname || ''
        let usersex = fields.usersex || ''
        let useraddress = fields.useraddress || ''
        // 有个默认的头像图片
        let useravatar = 'http://localhost:8000' + '/useravatar/default.jpg'
        // 如果用户上传了头像图片的话，则把默认的图片替换掉
        // originalFilename其实是无奈之下引用的，在服务器存储的只能看到是二进制文件
        if (files.useravatar) {
            useravatar = 'http://localhost:8000' + '/useravatar/' + basename(files.useravatar.newFilename)
        }

        // 接收完数据，进行更新
        let str = 'update userinfo set usersex = ?,useravatar = ?,usernickname = ?,useraddress = ? where id = ' + id
        let params = [usersex, useravatar, usernickname, useraddress]
        db.query(str, params, (err, results) => {
            if (err) {
                res.json({
                    errcode: 0,
                    message: '修改失败！'
                })
                // console.log(err);
            } else {
                res.json({
                    successcode: 200,
                    message: '修改成功！'
                })
            }
        })
    })
})

// 用户修改电话号码
router.post('/changephonenum', (req, res) => {
    let userid = req.body.userid
    let phone = req.body.phone
    let code = req.body.code
    console.log(req.body);
    console.log("session中的code:", req.session.phonecode);
    console.log("body携带的：", code);
    // 验证刚才存入的验证码是否和用户输入匹配
    if (req.session.phonecode !== code) {
        res.json({
            errcode: 0,
            message: '验证码不正确！'
        })
    }
    // 清掉刚才存入的验证码信息
    delete req.session.phonecode
    let str = 'update userinfo set userphone = ' + phone + ' where id = ' + userid
    db.query(str, (err, results) => {
        if (err) {
            res.json({
                errcode: 101,
                message: '手机号修改失败！'
            })
            console.log(err);
        } else {
            res.json({
                successcode: 200,
                message: '手机号修改成功！'
            })
        }
    })
})

// 用户查询自己的订单情况
router.post('/getpersonaltrade', (req, res) => {
    let userid = req.body.userid
    let str = 'select * from trade where userid = ' + userid
    db.query(str, (err, results) => {
        if (err) {
            res.json({
                errcode: 101,
                message: '服务器内部错误，请稍后再试！'
            })
        } else {
            results = JSON.parse(JSON.stringify(results))
            if (!results) {
                res.json({
                    errcode: 1,
                    message: '您还未有订单信息，快去下单叭！'
                })
            } else {
                res.json({
                    successcode: 200,
                    message: results
                })
            }
        }
    })
})

// 用户提交对商品的评价
router.post('/submitcomment',(req, res)=>{
    let {userid,username,goodsid,goodsname,comment,commentdate} = req.body
    let str = 'insert into comment set ?'
    let params = { userid,username,goodsid,goodsname,comment,commentdate}
    db.query(str,params,(err,results)=>{
        if(err){
            console.log(err);
            res.json({
                errcode: 0,
                message: '服务器内部错误！'
            })
        }else {
            res.json({
                successcode: 200,
                message: '评论发表成功！'
            })
        }
    })
})


/* 
---------管理员模块----------------
*/

// 管理员登录
router.post('/adminlogin', (req, res) => {
    let account = req.body.adminname
    let password = req.body.adminpwd
    // 管理员密码进行加密
    let adminMd5pwd = md5(md5(password) + S_KEY)
    let str = "select * from bossaccount where account = '" + account + "'"
    db.query(str, (err, results) => {
        if (err) {
            res.json({
                errcode: 0,
                message: '服务器出错,请稍后再试!'
            })
        } else if (results[0]) {
            let result = JSON.parse(JSON.stringify(results[0]))
            if (adminMd5pwd === result.password) {
                // 登录成功，把这个id存入session
                req.session.adminId = result.id
                res.json({
                    successcode: 200,
                    message: '管理员登录成功!'
                })
            } else {
                res.json({
                    errcode: 2,
                    message: '登录失败!'
                })
            }
        } else {
            res.json({
                errcode: 1,
                message: '该管理员账号不存在！'
            })
        }
    })
})

// 管理员退出登录
router.get('/adminlogout', (req, res) => {
    // 管理员登录的时候曾经把id留在session里，退出时删掉它
    delete req.session.adminId;
    res.json({
        successcode: 200,
        message: '退出登录成功！'
    })
})

// 管理员修改密码
router.post('/editadminpwd',(req,res)=>{
    // 原密码加密验证是否正确
    let oripassword = md5(md5(req.body.oripassword) + S_KEY)
    // 新密码加密存储
    let newpassword = md5(md5(req.body.newpassword) + S_KEY)
    let str = "select * from bossaccount where account = 'admin'"
    db.query(str,(err,results)=>{
        if(!err){
            results = JSON.parse(JSON.stringify(results[0]))
            if (oripassword == results.password) {
                let str1 = "update bossaccount set password = '"+ newpassword + "' where account = 'admin'"
                db.query(str1, (err, results) => {
                    if (!err) {
                        res.json({
                            successcode: 200,
                            message: '密码修改成功！'
                        })
                    }
                })
            } else if (oripassword != results.password) {
                res.json({
                    errcode: 101,
                    message: '初始密码输入不正确！'
                })
            }
        }
    })
})

// 获取所有用户信息
router.get('/getallusers', (req, res) => {
    let str = ' select id,username,userphone,usersex,useraddress,usernickname from userinfo'
    db.query(str, (err, results) => {
        if (err) {
            res.json({
                errcode: 0,
                message: '查询用户失败！'
            })
        } else {
            results = JSON.parse(JSON.stringify(results))
            res.json({
                successcode: 200,
                message: results
            })
        }
    })
})

// 下架商品
router.post('/deletegoods', (req, res) => {
    // 获取数据
    let {
        goodsid
    } = req.body
    // 删除某个商品，那么这个商品所在的分类的商品总数要减一
    let str = "update category set catecounts = catecounts-1 where categoryId in (select category from goods where goodsid = " + goodsid + " )"
    db.query(str, (err, results) => {
        if (err) {
            res.json({
                errcode: 0,
                message: '删除商品失败！'
            })
            console.log(err);
        } else {
            // 彻底删除该商品
            let str1 = 'delete from goods where goodsid = ' + goodsid
            db.query(str1, (err, results) => {
                if (err) {
                    ree.json({
                        errcode: 101,
                        message: '商品数更新完毕但删除失败！'
                    })
                } else {
                    res.json({
                        successcode: 200,
                        message: '删除商品成功！'
                    })
                }
            })
        }
    })
})

// 编辑商品信息
router.post('/updategoodsinfo', (req, res) => {
    let goodsid = req.body.goodsid
    let goodsname = req.body.goodsname
    let shortname = req.body.shortname
    let price = req.body.price
    let counts = req.body.counts
    let category = req.body.category

    let str = 'update goods set goodsname = ?,shortname = ?,price = ?,counts = ?,category = ? where goodsid = ' + goodsid
    let params = [goodsname, shortname, price, counts, category]
    db.query(str, params, (err, results) => {
        if (err) {
            res.json({
                errcode: 0,
                message: '修改商品信息失败！'
            })
        } else {
            res.json({
                successcode: 200,
                message: '修改商品信息成功！'
            })
        }
    })
})

// 管理员获取所有商品的信息
router.get('/getallgoods', (req, res) => {
    let str = 'select * from goods'
    db.query(str, (err, results) => {
        if (err) {
            res.json({
                errcode: 0,
                message: '查看商品信息失败！'
            })
        } else {
            results = JSON.parse(JSON.stringify(results))
            res.json({
                successcode: 200,
                message: results
            })
        }
    })
})

// 获取具体的分类名字，让管理员可以改变商品分类
// 获取具体的分类id
router.get('/admincategoryname', (req, res) => {
    let str = 'select categoryId,catename from category'
    db.query(str, (err, results) => {
        if (err) {
            res.json({
                errcode: 0,
                message: '请求商品分类数据失败！'
            })
        } else {
            results = JSON.parse(JSON.stringify(results))
            res.json({
                successcode: 200,
                message: results
            })
        }
    })
})

// 管理员获取订单的信息
router.get('/getAllTradeInfo', (req, res) => {
    let str = 'select * from trade'
    db.query(str, (err, results) => {
        if (err) {
            res.json({
                errcode: 0,
                message: '服务器内部繁忙，请稍后再试！'
            })
        } else {
            results = JSON.parse(JSON.stringify(results))
            if (results) {
                res.json({
                    successcode: 200,
                    message: results
                })
            } else if (!results) {
                res.json({
                    errcode: 101,
                    message: '还未有订单数据！'
                })
            }
        }
    })
})

// 上架商品
router.post('/addgoodsinfo', (req, res) => {
    // 使用formidable模块
    // 获取客户端传来的表单信息
    let form = new formidable.IncomingForm()
    // 上传图片放置的文件夹
    form.uploadDir = join(__dirname, './public/uploads')
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        console.log(fields);
        if (err) {
            return next(err);
        }
        // console.log(files); 
        let goodsid = fields.goodsid
        let goodsname = fields.goodsname
        let shortname = fields.shortname
        let price = fields.price
        let category = fields.category
        let counts = fields.counts
        let goodsurl = 'http://localhost:8000/uploads/' + basename(files.goodsimg.newFilename)
        let str = 'select * from goods where goodsid = ' + goodsid
        db.query(str, (err, results) => {
            if (err) {
                res.json({
                    errcode: 1,
                    message: '服务器内部出错！'
                })
                console.log(err);
            } else {
                results = JSON.parse(JSON.stringify(results))
                if (results[0]) {
                    //   商品已经存在
                    res.json({
                        errcode: 100,
                        message: '商品已经存在！'
                    })
                } else {
                    //   商品不存在
                    let str1 = 'insert into goods set ?'
                    let params = {
                        goodsid,
                        goodsname,
                        shortname,
                        goodsurl,
                        price,
                        counts,
                        category
                    }
                    db.query(str1, params, (err, results) => {
                        if (err) {
                            res.json({
                                errcode: 101,
                                message: '加入失败！'
                            })
                        } else {
                            let str2 = 'update category set catecounts=catecounts+1 where categoryId = ' + category
                            db.query(str2, [], (err, results) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    res.json({
                                        successcode: 200,
                                        message: '加入成功！'
                                    })
                                }
                            })
                        }
                    })
                }
            }
        })

    })
})

// 管理员删除已发布了的公告
router.post('/deletecurrentnotice',(req,res)=>{
    let str = 'delete from notice'
    db.query(str,(err,results)=>{
        if(err){
            res.json({
                errcode: 0,
                message: '删除失败！'
            })
        }else {
            res.json({
                successcode: 0,
                message: '删除成功！'
            })
        }
    })
})

// 管理员发布新公告
router.post('/publishnotice', (req, res) => {
    let noticecontent = req.body.notice
    // 公告数据库里只保留一条公告数据
    let str = 'delete from notice'
    let str1 = "insert into notice set notice = '" + noticecontent + "'"
    db.query(str,(err,results) => {
        if(!err){
            db.query(str1, (err, results) => {
                res.json({
                    successcode: 200,
                    message: '公告发布成功！'
                })
            })
        }
    })
})

// 管理员输入推荐的商品ID
router.post('/confirmgoodsid',(req,res)=>{
    let goodsid = req.body.goodsid
    let str = 'select * from goods where goodsid = '+ goodsid
    db.query(str,(err,results)=>{
        if(!err){
            results = JSON.parse(JSON.stringify(results))
            // 输入的商品ID不正确
            if(!results[0]){
                res.json({
                    errcode: 101,
                    message: '该ID对应的商品不存在！'
                })
            }else {
                res.json({
                    successcode: 200,
                    message: results
                })
            }
        }
    })
})

// 管理员确认提交推荐商品
router.post('/admitRecommend',(req,res)=>{
    let {goods1,goods2,goods3} = req.body
    // 首页只会展示三个推荐的商品，所以每推荐新的，都先清空旧的
    let str = 'delete from homerecommend'
    db.query(str)
    let str1 = 'insert into homerecommend (goodsid,shortname,goodsurl,price) select goodsid,shortname,goodsurl,price from goods where goodsid in (' + goods1 + ',' + goods2 + ',' + goods3 + ')'
    db.query(str1,(err,results)=>{
        if(!err){
            results = JSON.parse(JSON.stringify(results))
            res.json({
                successcode: 200,
                message: results
            })
        }
    })
})

// 管理员查看评价信息
router.get('/allcomments',(req,res)=>{
    let str = 'select * from comment'
    db.query(str,(err,results)=>{
        if(!err){
            results = JSON.parse(JSON.stringify(results))
            if(!results[0]){
                res.json({
                    errcode: 0,
                    message: '未有任何评价信息！'
                })
            }else{
                res.json({
                    successcode: 200,
                    message: results
                })
            }
        }
    })
})

// 管理员删除某条评价
router.post('/delcomment',(req,res)=>{
    let commentId = req.body.commentId
    let str = 'delete from comment where commentId = ' + commentId
    db.query(str,(err,results)=>{
        if(!err){
            res.json({
                successcode: 200,
                message: '删除成功！'
            })
        }
    })
})

export default router