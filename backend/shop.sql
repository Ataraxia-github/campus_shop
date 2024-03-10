/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50087
 Source Host           : localhost:3306
 Source Schema         : shop

 Target Server Type    : MySQL
 Target Server Version : 50087
 File Encoding         : 65001

 Date: 10/03/2024 13:20:27
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for bossaccount
-- ----------------------------
DROP TABLE IF EXISTS `bossaccount`;
CREATE TABLE `bossaccount`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY USING BTREE (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of bossaccount
-- ----------------------------
INSERT INTO `bossaccount` VALUES (1, 'admin', 'a28f425d226d1ca88bfe8b572f71ecaf');

-- ----------------------------
-- Table structure for cart
-- ----------------------------
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart`  (
  `goodsid` int(11) NOT NULL,
  `goodsname` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `goodsurl` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `price` decimal(10, 0) NULL DEFAULT NULL,
  `buycount` int(11) NULL DEFAULT NULL,
  `userid` int(11) NOT NULL,
  `counts` int(11) NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of cart
-- ----------------------------
INSERT INTO `cart` VALUES (10039, '纯棉洗脸家用吸水不易掉毛新疆棉柔软男女夏洗澡巾1条', 'https://img.alicdn.com/imgextra/i4/725677994/O1CN01XUi46h28vInWaVnIC_!!725677994.jpg_430x430q90.jpg', 10, 1, 5, 399);
INSERT INTO `cart` VALUES (10001, '高纤维粗粮饼800g休闲零食礼盒代餐充饥', 'https://img.alicdn.com/imgextra/i1/725677994/O1CN01dOaJ6228vItYMSNrY_!!725677994.jpg_430x430q90.jpg', 30, 0, 13, 183);

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `categoryId` int(11) NOT NULL,
  `catename` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `cateicon` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `catecounts` int(11) NULL DEFAULT NULL,
  PRIMARY KEY USING BTREE (`categoryId`)
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, '零食、早餐', 'el-icon-burger', 8);
INSERT INTO `category` VALUES (2, '饮料、酒水', 'el-icon-ice-drink', 5);
INSERT INTO `category` VALUES (3, '个人洗护', 'el-icon-s-shop', 14);
INSERT INTO `category` VALUES (4, '宿舍清洁', 'el-icon-toilet-paper', 8);
INSERT INTO `category` VALUES (5, '生活用品', 'el-icon-house', 15);
INSERT INTO `category` VALUES (6, '学习文具', 'el-icon-reading', 11);

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `goodsid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `comment` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `commentdate` datetime NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `commentId` int(11) NOT NULL AUTO_INCREMENT,
  `goodsname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY USING BTREE (`commentId`)
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES (10013, 5, '味道居然还挺不错的！', '2022-04-22 00:00:00', 'can', 5, '西柚汁饮料445ml补充维生素C');
INSERT INTO `comment` VALUES (10013, 10, '听朋友说这款饮料挺好喝的，确实不错。', '2022-04-22 15:50:42', 'test', 6, '西柚汁饮料445ml补充维生素C');
INSERT INTO `comment` VALUES (10006, 3, '这款泡面挺好吃，一直买来当作早餐。', '2022-05-01 15:16:52', 'today', 8, '熬制高汤日式豚骨面100g*5袋装泡面速食即食面');
INSERT INTO `comment` VALUES (10009, 3, '这款可乐冰冻后更好喝！', '2022-05-26 15:52:02', 'today', 9, '可口可乐碳酸饮料200ml汽水原味小罐装');
INSERT INTO `comment` VALUES (10028, 12, '这款的抽纸纸质一直不错的。。', '2022-05-27 14:25:17', 'testone', 10, '抽纸3层120抽24包M码纸巾餐巾纸面巾纸家用实惠装整箱');

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods`  (
  `goodsid` bigint(20) NOT NULL COMMENT '商品id',
  `goodsname` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '商品名字',
  `shortname` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '商品简称',
  `goodsurl` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '商品图片地址',
  `price` double(11, 2) NULL DEFAULT NULL COMMENT '商品单价',
  `category` int(6) NULL DEFAULT NULL COMMENT '商品种类',
  `counts` int(11) NULL DEFAULT NULL COMMENT '商品库存',
  PRIMARY KEY USING BTREE (`goodsid`)
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES (10001, '好吃点饼干', '高纤维粗粮饼800g休闲零食礼盒代餐充饥', 'https://img.alicdn.com/imgextra/i1/725677994/O1CN01dOaJ6228vItYMSNrY_!!725677994.jpg_430x430q90.jpg', 29.90, 1, 183);
INSERT INTO `goods` VALUES (10002, '奥利奥夹心饼干', '原味网红零食超值12小包小吃早餐696g', 'https://img.alicdn.com/imgextra/i3/725677994/O1CN01hTlF4228vIpZOT5yS_!!725677994-0-sm.jpg_430x430q90.jpg', 32.90, 1, 192);
INSERT INTO `goods` VALUES (10003, '曲奇粒粒巧克力味', '96g大块巧克力饼干网红零食曲奇饼干', 'https://img.alicdn.com/imgextra/i2/725677994/O1CN01lfmks528vIpSJfy7J_!!725677994.jpg_430x430q90.jpg', 16.90, 1, 199);
INSERT INTO `goods` VALUES (10004, '法式小面包', '1.5kg*1箱整箱营养早餐包蛋糕点休闲零食小吃', 'https://img.alicdn.com/imgextra/i3/725677994/O1CN01atVbwh28vIt1VNFvb_!!725677994.jpg_430x430q90.jpg', 31.90, 1, 400);
INSERT INTO `goods` VALUES (10005, '豪士乳酸菌小口袋', '小口袋面包680g*1盒早餐整箱蛋糕点心吐司', 'https://img.alicdn.com/imgextra/i4/6000000002569/O1CN01yHCBde1Uqe8c8KKU6_!!6000000002569-0-at.jpg_430x430q90.jpg', 29.90, 1, 198);
INSERT INTO `goods` VALUES (10006, '康师傅方便面', '熬制高汤日式豚骨面100g*5袋装泡面速食即食面', 'https://img.alicdn.com/imgextra/i4/6000000002192/O1CN015u75m51S3yoQxviQs_!!6000000002192-0-at.jpg_430x430q90.jpg', 11.90, 1, 148);
INSERT INTO `goods` VALUES (10007, '汤达人辣牛肉面', '统一汤达人韩式辣牛肉面方便面泡面125g*5袋', 'https://img.alicdn.com/imgextra/i2/725677994/O1CN018tIIVH28vIqDL5BH0_!!725677994-0-sm.jpg_430x430q90.jpg', 21.50, 1, 200);
INSERT INTO `goods` VALUES (10008, '开心桶鲜虾鱼板面', '康师傅方便面开心桶鲜虾鱼板面98g/桶装泡面桶装速食面即食面', 'https://img.alicdn.com/imgextra/i1/6000000000926/TB29sWdorZnBKNjSZFhXXc.oXXa_!!6000000000926-0-at.jpg_430x430q90.jpg', 4.99, 1, 200);
INSERT INTO `goods` VALUES (10009, '可口可乐', '可口可乐碳酸饮料200ml汽水原味小罐装', 'https://img.alicdn.com/imgextra/i4/725677994/O1CN01I5TcIc28vIquDWP2T_!!725677994.jpg_430x430q90.jpg', 3.00, 2, 186);
INSERT INTO `goods` VALUES (10010, '屈臣氏原味苏打汽水', '原味苏打汽水330ml无糖零卡苏打水气泡水饮料', 'https://img.alicdn.com/imgextra/i2/3596645383/O1CN01sz9k5f1pdSkKW3hAD_!!3596645383-0-scmitem6000.jpg_430x430q90.jpg', 5.00, 2, 200);
INSERT INTO `goods` VALUES (10011, '王老吉凉茶', '植物饮料310ml怕上火喝王老吉红罐', 'https://img.alicdn.com/imgextra/i3/725677994/O1CN01bK1J7A28vIpvQBMgr_!!725677994-0-sm.jpg_430x430q90.jpg', 4.00, 2, 99);
INSERT INTO `goods` VALUES (10012, '脉动青柠口味', '600ML低糖维生素饮品运动型功能饮料', 'https://img.alicdn.com/imgextra/i4/725677994/O1CN01GKg68x28vIstOb1gy_!!725677994.jpg_430x430q90.jpg', 4.00, 2, 199);
INSERT INTO `goods` VALUES (10013, '水溶C100西柚汁饮料', '西柚汁饮料445ml补充维生素C', 'https://img.alicdn.com/imgextra/i1/6000000005652/O1CN01yWfNOt1rcfD2Iisug_!!6000000005652-0-at.jpg_430x430q90.jpg', 4.50, 2, 192);
INSERT INTO `goods` VALUES (10014, '海飞丝洗发水', '清爽去油洗发露750g×1瓶去屑控油止痒男女长效去屑', '//img.alicdn.com/imgextra/i3/725677994/O1CN01jvnrnA28vIt3DScz5_!!725677994.jpg_430x430q90.jpg', 55.80, 3, 297);
INSERT INTO `goods` VALUES (10015, '飘柔洗发水', '兰花去屑1L×1瓶家庭装控油洗发露持久留香洗头水', '//img.alicdn.com/imgextra/i4/725677994/O1CN01iEAg4r28vIrNG3Y9W_!!725677994.jpg_430x430q90.jpg', 29.90, 3, 200);
INSERT INTO `goods` VALUES (10016, '清扬洗发水', '洗发露洗发膏清爽控油去屑洁净500g×2+100g', 'https://img.alicdn.com/imgextra/i2/6000000000190/O1CN01PfS94i1DH408FoUy0_!!6000000000190-0-picassoopen.jpg_430x430q90.jpg', 69.90, 3, 200);
INSERT INTO `goods` VALUES (10017, '美肤沐浴露', '深层营润滋养美肤沐浴露沐浴乳1kg滋润保湿补水男女', '//img.alicdn.com/imgextra/i1/725677994/O1CN01GhFEfg28vIrXVJVWK_!!725677994.jpg_430x430q90.jpg', 45.90, 3, 200);
INSERT INTO `goods` VALUES (10018, '悠然碧野沐浴露', '日本进口可悠然碧野沐浴露沐浴乳家用滋润保湿550ml家庭家庭装', '//img.alicdn.com/imgextra/i1/725677994/O1CN01DZFqiQ28vIrY1oLp9_!!725677994.jpg_430x430q90.jpg', 67.00, 3, 80);
INSERT INTO `goods` VALUES (10019, 'white美白牙膏', ' white美白牙膏大白防蛀清新去渍150g×1支', 'https://img.alicdn.com/imgextra/i4/6000000003431/O1CN01Fba3Ug1bDRdTVhGDW_!!6000000003431-0-picassoopen.jpg_430x430q90.jpg', 14.90, 3, 150);
INSERT INTO `goods` VALUES (10020, '云南白药牙膏', '留兰香型45g清新口气减轻牙龈问题旅行装试用装小样', 'https://img.alicdn.com/imgextra/i2/725677994/O1CN01OinIlP28vIpwrLLny_!!725677994-0-https://img.alicdn.com/imgextra/i1/725677994/O1CN01RsUEjH28vIpu9P8AU_!!725677994.png_430x430q90.jpg', 11.90, 3, 120);
INSERT INTO `goods` VALUES (10021, '劲爽漱口水', '冰蓝劲爽漱口水除口臭去牙渍清新500ml×3瓶', 'https://img.alicdn.com/imgextra/i3/6000000006030/O1CN01HnhRe61uPmvvR9irs_!!6000000006030-0-at.jpg_430x430q90.jpg', 31.90, 3, 80);
INSERT INTO `goods` VALUES (10022, '珂润洗面奶', '保湿补水洁面泡沫温和敏感肌男女150ml洁面乳', 'https://img.alicdn.com/imgextra/i1/725677994/O1CN01CYTZ8O28vIq1QgqRC_!!725677994.jpg_430x430q90.jpg', 69.00, 3, 120);
INSERT INTO `goods` VALUES (10023, '飞科剃须刀', '智能电动刮胡刀全身水洗便携充电刮胡须刀正品FS889', 'https://img.alicdn.com/imgextra/i4/725677994/O1CN01NpNP9a28vIqxnnC9m_!!725677994.jpg_430x430q90.jpg', 99.00, 3, 60);
INSERT INTO `goods` VALUES (10024, '资生堂小金瓶防晒霜', '安热沙资生堂小金瓶防晒霜防晒乳防晒露60ml面部身体可用', 'https://img.alicdn.com/imgextra/i1/725677994/O1CN01cOj5tJ28vIppy0qYI_!!725677994.jpg_430x430q90.jpg', 258.00, 3, 120);
INSERT INTO `goods` VALUES (10025, '动力防晒霜50ml', '资生堂蓝胖子新艳阳夏臻效水动力防晒霜50ml', 'https://img.alicdn.com/imgextra/i4/725677994/O1CN01A2Prsu28vIq9UHVIa_!!725677994.jpg_430x430q90.jpg', 199.00, 3, 120);
INSERT INTO `goods` VALUES (10026, '抑菌洗手液', '威露士倍护滋润抵御干燥抑菌洗手液怡人清香清香型525ml家用', 'https://img.alicdn.com/imgextra/i2/725677994/O1CN01LXOK5Z28vIpoJIcOr_!!725677994.jpg_430x430q90.jpg', 9.90, 3, 80);
INSERT INTO `goods` VALUES (10027, '舒肤佳洗手液', '舒肤佳洗手液柠檬清香225ml抑菌便携式官方正品', 'https://img.alicdn.com/imgextra/i2/725677994/O1CN01wEYLIH28vIpAexOu3_!!725677994.jpg_430x430q90.jpg', 9.90, 3, 150);
INSERT INTO `goods` VALUES (10028, '维达超韧抽纸3层', '抽纸3层120抽24包M码纸巾餐巾纸面巾纸家用实惠装整箱', 'https://img.alicdn.com/imgextra/i2/725677994/O1CN01lIeIni28vIqVyVEhg_!!725677994.jpg_430x430q90.jpg', 59.90, 4, 395);
INSERT INTO `goods` VALUES (10029, '清风抽纸原木金装', '宽幅纸巾M规3层140抽24包面巾纸家用实惠装整箱', 'https://img.alicdn.com/imgextra/i1/725677994/O1CN01yofsXC28vIryTGdAF_!!725677994.jpg_430x430q90.jpg', 69.90, 4, 400);
INSERT INTO `goods` VALUES (10030, '斧头牌柠檬洗洁精', '斧头牌柠檬洗洁精1.18kg*4瓶可洗家庭装洗涤剂洗碗液家用', 'https://img.alicdn.com/imgextra/i1/725677994/O1CN01ypjbEp28vIoI62Nk5_!!725677994.jpg_430x430q90.jpg', 59.90, 4, 280);
INSERT INTO `goods` VALUES (10031, '超能洗洁精', '超能洗洁精离子去油(西柚祛腥)1.5kg/瓶餐具', 'https://img.alicdn.com/imgextra/i3/725677994/O1CN01Q3BVyL28vIsRTDjPj_!!725677994.jpg_430x430q90.jpg', 15.90, 4, 300);
INSERT INTO `goods` VALUES (10032, '蓝月亮亮白洗衣液', '加量不加价】蓝月亮亮白洗衣液薰衣草家用6.5kg促销', 'https://img.alicdn.com/imgextra/i1/725677994/O1CN01F8OVNk28vIpy12MPt_!!725677994.jpg_430x430q90.jpg', 99.90, 4, 395);
INSERT INTO `goods` VALUES (10033, '奥妙洗衣粉除菌', '除菌 除螨 桉树艾草香无磷温和2.8kg', 'https://img.alicdn.com/imgextra/i1/725677994/TB2yPuIX8smBKNjSZFFXXcT9VXa_!!725677994.jpg_430x430q90.jpg', 27.90, 4, 279);
INSERT INTO `goods` VALUES (10034, '汰渍全效360度洗衣粉', '360度洗衣粉洁雅百合香型1kg*1袋家用香味持久', 'https://img.alicdn.com/imgextra/i3/725677994/O1CN01HDqJnp28vIqllofej_!!725677994.jpg_430x430q90.jpg', 9.90, 4, 300);
INSERT INTO `goods` VALUES (10035, '妙洁妙洁抹布', '抹布吸水不掉毛家用洗碗抹布家务清洁3片*1包洗碗布', 'https://img.alicdn.com/imgextra/i3/725677994/TB2DhBWoCYH8KJjSspdXXcRgVXa_!!725677994.jpg_430x430q90.jpg', 7.90, 4, 400);
INSERT INTO `goods` VALUES (10036, '晒袜子衣架多夹子', '茶花圆形晒袜子衣架多夹子圆盘14夹防风晾衣架晒内衣裤袜晾衣夹子', 'https://img.alicdn.com/imgextra/i1/725677994/O1CN01h3EffM28vIfxNwmPW_!!725677994.jpg_430x430q90.jpg', 10.90, 5, 399);
INSERT INTO `goods` VALUES (10037, '宽肩衣架家用晾晒', '宽肩衣架家用晾晒无痕晾衣服防滑防肩角架12只装', 'https://img.alicdn.com/imgextra/i2/725677994/O1CN01HCsQ5528vIszuFCYQ_!!725677994.jpg_430x430q90.jpg', 19.80, 5, 280);
INSERT INTO `goods` VALUES (10038, '妙然双层晒衣篮', '晾晒网晾衣架衣服的网兜晾袜子防变形防风晾晒毛衣', 'https://img.alicdn.com/imgextra/i3/725677994/O1CN01uUwLGG28vIs5YxC1T_!!725677994.jpg_430x430q90.jpg', 15.90, 5, 200);
INSERT INTO `goods` VALUES (10039, '洁丽雅毛巾', '纯棉洗脸家用吸水不易掉毛新疆棉柔软男女夏洗澡巾1条', 'https://img.alicdn.com/imgextra/i4/725677994/O1CN01XUi46h28vInWaVnIC_!!725677994.jpg_430x430q90.jpg', 9.90, 5, 399);
INSERT INTO `goods` VALUES (10040, '最生活毛巾加厚款', '加厚款3条装全棉洗脸毛巾纯棉吸水抗菌家用新疆棉', 'https://img.alicdn.com/imgextra/i2/725677994/O1CN01SCpiKn28vIt0curu3_!!725677994.jpg_430x430q90.jpg', 69.90, 5, 280);
INSERT INTO `goods` VALUES (10041, '朴西浴室拖鞋男士', '男士夏季室内防滑洗澡家居软底静音居家凉拖鞋女家用', 'https://img.alicdn.com/imgextra/i1/725677994/O1CN01ZbrU9B28vItQ32c2p_!!725677994.jpg_430x430q90.jpg', 39.80, 5, 300);
INSERT INTO `goods` VALUES (10042, '空调被双人夏季薄款', '南极人水洗棉柔顺夏被空调被双人夏季薄款被子', 'https://img.alicdn.com/imgextra/i4/725677994/O1CN01mh9Wqn28vItSIS9ZY_!!725677994.jpg_430x430q90.jpg', 59.00, 5, 200);
INSERT INTO `goods` VALUES (10043, '多喜爱蚊帐1.8m床', '1.8m床1.5m1.2m家用免安装蚊帐加厚蚊帐蒙古包防摔蚊帐', 'https://img.alicdn.com/imgextra/i2/725677994/O1CN01159PwU28vIt71Wd4m_!!725677994.jpg_430x430q90.jpg', 229.00, 5, 200);
INSERT INTO `goods` VALUES (10044, '博洋凉席夏季藤席', '博洋凉席夏季藤席单件床笠款家用可折叠夏天裸睡', 'https://img.alicdn.com/imgextra/i3/253285776/O1CN01xn8nFz1sXSM3IDmJk_!!253285776.jpg_430x430q90.jpg', 199.00, 5, 300);
INSERT INTO `goods` VALUES (10045, '博洋家纺全棉枕头双人', '双人家用新疆棉枕芯可水洗家用防螨枕护颈椎枕芯', 'https://img.alicdn.com/imgextra/i4/725677994/O1CN012pU1GX28vItDBiA40_!!725677994.jpg_430x430q90.jpg', 57.00, 5, 200);
INSERT INTO `goods` VALUES (10046, '洁成中号加厚垃圾袋', '垃圾袋宽口家用实惠装150只收纳塑料袋干湿分类餐饮', 'https://img.alicdn.com/imgextra/i3/725677994/O1CN01Vknn0I28vIprSrxf6_!!725677994.jpg_430x430q90.jpg', 7.90, 5, 400);
INSERT INTO `goods` VALUES (10047, '美丽雅抽绳垃圾袋', '家用手提式加厚厨房清洁袋大号穿绳垃圾袋150只', 'https://img.alicdn.com/imgextra/i2/725677994/O1CN01CvjsR728vIpQXdcoB_!!725677994.jpg_430x430q90.jpg', 39.90, 5, 400);
INSERT INTO `goods` VALUES (10048, '酒店家用牙签600支', '双枪天然环保酒店家用牙签600支袋装竹牙签', 'https://img.alicdn.com/imgextra/i1/725677994/O1CN01vv20ns28vIhHUQob2_!!725677994.jpg_430x430q90.jpg', 5.50, 5, 500);
INSERT INTO `goods` VALUES (10049, '飞科电吹风机', '飞科电吹风机家用宿舍负离子护发大功率轻音网红吹风筒6276吹风机', 'https://img.alicdn.com/imgextra/i2/725677994/O1CN01TGfu6128vIpV4DaMJ_!!725677994.jpg_430x430q90.jpg', 39.00, 5, 80);
INSERT INTO `goods` VALUES (10050, '美丽雅收纳箱塑料', '美丽雅收纳箱塑料透明手提式1只家用桌面玩具小件整理箱', 'https://img.alicdn.com/imgextra/i3/725677994/O1CN01e0EyLG28vIqrE74Fk_!!725677994.jpg_430x430q90.jpg', 14.90, 5, 180);
INSERT INTO `goods` VALUES (10051, '斑马笔JJ15中性笔', '中性笔套装日本进口文具黑笔学生用按动0.5mm', 'https://img.alicdn.com/imgextra/i2/2205189512527/O1CN01JixDtn1UXPZqNA29r_!!2205189512527.jpg_430x430q90.jpg', 6.00, 6, 300);
INSERT INTO `goods` VALUES (10052, '涂改橡皮长方形', '一正文具擦字成线涂改橡皮长方形奥特曼橡皮擦', 'https://img.alicdn.com/imgextra/i4/288902762/O1CN01tK8EAP1WH2cjYFfQM_!!288902762.jpg_430x430q90.jpg', 4.80, 6, 200);
INSERT INTO `goods` VALUES (10053, '大容量多功能铅笔盒', '一正文具减压笔盒解压笔袋文具包', 'https://img.alicdn.com/imgextra/i4/725677994/O1CN01xHsHcq28vIqzz7r26_!!725677994.jpg_430x430q90.jpg', 40.00, 6, 100);
INSERT INTO `goods` VALUES (10054, '晨光复印纸打印纸蓝', '晨光70g多功能a4白纸草稿纸画画办公用', 'https://img.alicdn.com/imgextra/i4/725677994/O1CN01pR6uMP28vIqWmuamh_!!725677994.jpg_430x430q90.jpg', 47.90, 6, 200);
INSERT INTO `goods` VALUES (10055, 'Deli/得力文具金属/透明套尺', '考试画图多功能直尺三角尺量角器尺子', 'https://img.alicdn.com/imgextra/i2/288902762/O1CN01IF5pQg1WH2fE4sDgK_!!288902762.jpg_430x430q90.jpg', 6.90, 6, 200);
INSERT INTO `goods` VALUES (10056, '正品晨光孔庙文具套装', '学生考试涂卡笔自动铅笔2b铅芯替芯橡皮尺子', 'https://img.alicdn.com/imgextra/i3/725677994/O1CN01DEUBQF28vIrYYxFkW_!!725677994.jpg_430x430q90.jpg', 9.90, 6, 250);
INSERT INTO `goods` VALUES (10057, '晨光软尺子透明多规格', '直尺波浪尺绘画制图工具可弯曲学生用刻度尺', 'https://img.alicdn.com/imgextra/i2/725677994/O1CN01VJv6LO28vIrCJuXb7_!!725677994.jpg_430x430q90.jpg', 6.90, 6, 300);
INSERT INTO `goods` VALUES (10058, '久量台灯学习专用', '国A级学生护眼led阅读充插两用床头宿舍书桌卧室', 'https://img.alicdn.com/imgextra/i4/725677994/O1CN01ZEHEOR28vIqjxfJvp_!!725677994.jpg_430x430q90.jpg', 99.00, 6, 150);
INSERT INTO `goods` VALUES (10059, '得力削笔机', '削笔机转笔刀卷笔刀削笔刀手摇铅笔削笔器', 'https://img.alicdn.com/imgextra/i1/725677994/O1CN01MWRd7v28vIsLdT4b8_!!725677994.jpg_430x430q90.jpg', 12.90, 6, 200);
INSERT INTO `goods` VALUES (10060, '晨光修正带大容量', '大容量涂改带改正带学生用多功能实惠装', 'https://img.alicdn.com/imgextra/i1/725677994/O1CN01hgTqJI28vIreHubgY_!!725677994.jpg_430x430q90.jpg', 11.50, 6, 150);
INSERT INTO `goods` VALUES (10299, '测试商品', '非常好用的图片', 'http://localhost:8000/uploads/e974e6280e86171b4c911db01', 99999.00, 6, 3);

-- ----------------------------
-- Table structure for homecasual
-- ----------------------------
DROP TABLE IF EXISTS `homecasual`;
CREATE TABLE `homecasual`  (
  `id` int(11) NOT NULL,
  `imgurl` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY USING BTREE (`id`)
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of homecasual
-- ----------------------------
INSERT INTO `homecasual` VALUES (1, 'http://localhost:8000/images/home/home1.jpg');
INSERT INTO `homecasual` VALUES (2, 'http://localhost:8000/images/home/home2.jpg');
INSERT INTO `homecasual` VALUES (3, 'http://localhost:8000/images/home/home3.jpg');
INSERT INTO `homecasual` VALUES (4, 'http://localhost:8000/images/home/home4.jpg');
INSERT INTO `homecasual` VALUES (5, 'http://localhost:8000/images/home/home5.jpg');

-- ----------------------------
-- Table structure for homerecommend
-- ----------------------------
DROP TABLE IF EXISTS `homerecommend`;
CREATE TABLE `homerecommend`  (
  `goodsid` bigint(20) NOT NULL COMMENT '商品id',
  `shortname` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '商品简称',
  `goodsurl` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '商品图片地址',
  `price` double(11, 2) NULL DEFAULT NULL,
  PRIMARY KEY USING BTREE (`goodsid`)
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of homerecommend
-- ----------------------------
INSERT INTO `homerecommend` VALUES (10001, '高纤维粗粮饼800g休闲零食礼盒代餐充饥', 'https://img.alicdn.com/imgextra/i1/725677994/O1CN01dOaJ6228vItYMSNrY_!!725677994.jpg_430x430q90.jpg', 39.90);
INSERT INTO `homerecommend` VALUES (10002, '原味网红零食超值12小包小吃早餐696g', 'https://img.alicdn.com/imgextra/i3/725677994/O1CN01hTlF4228vIpZOT5yS_!!725677994-0-sm.jpg_430x430q90.jpg', 32.90);
INSERT INTO `homerecommend` VALUES (10003, '96g大块巧克力饼干网红零食曲奇饼干', 'https://img.alicdn.com/imgextra/i2/725677994/O1CN01lfmks528vIpSJfy7J_!!725677994.jpg_430x430q90.jpg', 16.90);

-- ----------------------------
-- Table structure for notice
-- ----------------------------
DROP TABLE IF EXISTS `notice`;
CREATE TABLE `notice`  (
  `noticeId` int(5) NOT NULL AUTO_INCREMENT,
  `notice` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '公告内容',
  PRIMARY KEY USING BTREE (`noticeId`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of notice
-- ----------------------------
INSERT INTO `notice` VALUES (1, '今天可以送上楼了！');

-- ----------------------------
-- Table structure for trade
-- ----------------------------
DROP TABLE IF EXISTS `trade`;
CREATE TABLE `trade`  (
  `tradeId` int(6) NOT NULL AUTO_INCREMENT COMMENT '订单编号',
  `userid` int(11) NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `userphone` decimal(11, 0) NOT NULL,
  `useraddress` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `goodslist` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '要longtext',
  `trademoney` decimal(8, 2) NOT NULL COMMENT '订单总金额',
  `tradetip` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '订单备注',
  `tradetime` datetime NULL DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '订单状态',
  PRIMARY KEY USING BTREE (`tradeId`)
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of trade
-- ----------------------------
INSERT INTO `trade` VALUES (22, 5, '天使战士', 18066689121, '1-1209', '[{\"goodsid\":10001,\"goodsname\":\"高纤维粗粮饼800g休闲零食礼盒代餐充饥\",\"goodsurl\":\"https://img.alicdn.com/imgextra/i1/725677994/O1CN01dOaJ6228vItYMSNrY_!!725677994.jpg_430x430q90.jpg\",\"price\":40,\"buycount\":2,\"userid\":5,\"counts\":187,\"checked\":true},{\"goodsid\":10032,\"goodsname\":\"加量不加价】蓝月亮亮白洗衣液薰衣草家用6.5kg促销\",\"goodsurl\":\"https://img.alicdn.com/imgextra/i1/725677994/O1CN01F8OVNk28vIpy12MPt_!!725677994.jpg_430x430q90.jpg\",\"price\":100,\"buycount\":1,\"userid\":5,\"counts\":396,\"checked\":true}]', 140.00, '', '2022-04-23 12:06:07', '已处理');
INSERT INTO `trade` VALUES (23, 5, '天使战士', 18056323521, '6-1209', '[{\"goodsid\":10002,\"goodsname\":\"原味网红零食超值12小包小吃早餐696g\",\"goodsurl\":\"https://img.alicdn.com/imgextra/i3/725677994/O1CN01hTlF4228vIpZOT5yS_!!725677994-0-sm.jpg_430x430q90.jpg\",\"price\":33,\"buycount\":1,\"userid\":5,\"counts\":193,\"checked\":true},{\"goodsid\":10033,\"goodsname\":\"除菌 除螨 桉树艾草香无磷温和2.8kg\",\"goodsurl\":\"https://img.alicdn.com/imgextra/i1/725677994/TB2yPuIX8smBKNjSZFFXXcT9VXa_!!725677994.jpg_430x430q90.jpg\",\"price\":28,\"buycount\":1,\"userid\":5,\"counts\":280,\"checked\":true}]', 61.00, '', '2022-04-23 12:07:47', '已处理');
INSERT INTO `trade` VALUES (24, 3, '佛系掌门人', 18026649154, '宿舍1011', '[{\"goodsid\":10013,\"goodsname\":\"西柚汁饮料445ml补充维生素C\",\"goodsurl\":\"https://img.alicdn.com/imgextra/i1/6000000005652/O1CN01yWfNOt1rcfD2Iisug_!!6000000005652-0-at.jpg_430x430q90.jpg\",\"price\":5,\"buycount\":1,\"userid\":3,\"counts\":193,\"checked\":true},{\"goodsid\":10005,\"goodsname\":\"小口袋面包680g*1盒早餐整箱蛋糕点心吐司\",\"goodsurl\":\"https://img.alicdn.com/imgextra/i4/6000000002569/O1CN01yHCBde1Uqe8c8KKU6_!!6000000002569-0-at.jpg_430x430q90.jpg\",\"price\":30,\"buycount\":2,\"userid\":3,\"counts\":200,\"checked\":true}]', 35.00, '希望送货速度快一点！谢谢！', '2022-04-28 14:43:00', '已处理');
INSERT INTO `trade` VALUES (25, 3, '佛系掌门人', 18026649131, '新宿舍', '[{\"goodsid\":10006,\"goodsname\":\"熬制高汤日式豚骨面100g*5袋装泡面速食即食面\",\"goodsurl\":\"https://img.alicdn.com/imgextra/i4/6000000002192/O1CN015u75m51S3yoQxviQs_!!6000000002192-0-at.jpg_430x430q90.jpg\",\"price\":12,\"buycount\":2,\"userid\":3,\"counts\":150,\"checked\":true}]', 12.00, '希望在本周日晚之前能收到！', '2022-05-01 15:06:16', '等待处理');
INSERT INTO `trade` VALUES (26, 3, '佛系掌门人', 13027749184, '3-1209', '[{\"goodsid\":10001,\"goodsname\":\"高纤维粗粮饼800g休闲零食礼盒代餐充饥\",\"goodsurl\":\"https://img.alicdn.com/imgextra/i1/725677994/O1CN01dOaJ6228vItYMSNrY_!!725677994.jpg_430x430q90.jpg\",\"price\":40,\"buycount\":2,\"userid\":3,\"counts\":185,\"checked\":true},{\"goodsid\":10009,\"goodsname\":\"可口可乐碳酸饮料200ml汽水原味小罐装\",\"goodsurl\":\"https://img.alicdn.com/imgextra/i4/725677994/O1CN01I5TcIc28vIquDWP2T_!!725677994.jpg_430x430q90.jpg\",\"price\":3,\"buycount\":8,\"userid\":3,\"counts\":195,\"checked\":true}]', 43.00, '送快点！！我很渴！', '2022-05-26 15:51:33', '等待处理');
INSERT INTO `trade` VALUES (27, 12, 'testone', 18088849183, '88-1212', '[{\"goodsid\":10028,\"goodsname\":\"抽纸3层120抽24包M码纸巾餐巾纸面巾纸家用实惠装整箱\",\"goodsurl\":\"https://img.alicdn.com/imgextra/i2/725677994/O1CN01lIeIni28vIqVyVEhg_!!725677994.jpg_430x430q90.jpg\",\"price\":60,\"buycount\":2,\"userid\":12,\"counts\":397,\"checked\":true},{\"goodsid\":10009,\"goodsname\":\"可口可乐碳酸饮料200ml汽水原味小罐装\",\"goodsurl\":\"https://img.alicdn.com/imgextra/i4/725677994/O1CN01I5TcIc28vIquDWP2T_!!725677994.jpg_430x430q90.jpg\",\"price\":3,\"buycount\":1,\"userid\":12,\"counts\":187,\"checked\":true}]', 63.00, '中午宿舍才有人，中午再送货。', '2022-05-27 14:23:59', '等待处理');

-- ----------------------------
-- Table structure for userinfo
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `userpwd` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `userphone` decimal(11, 0) NULL DEFAULT NULL,
  `usersex` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `useraddress` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `usernickname` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `useravatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY USING BTREE (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of userinfo
-- ----------------------------
INSERT INTO `userinfo` VALUES (3, 'today', 'a2349c4659e972b9e8c608392a2e1054', NULL, '男', '', '佛系掌门人', 'http://localhost:8000/useravatar/826f9b61d8459a6254e78fa00');
INSERT INTO `userinfo` VALUES (5, 'can', 'a2349c4659e972b9e8c608392a2e1054', 18099549181, '男', '88-1209', '天使战士', 'http://localhost:8000/useravatar/default.jpg');
INSERT INTO `userinfo` VALUES (10, 'test', '794b1545d9677bb9924a48e1a34f7d06', NULL, '男', '46-1001', 'today', 'http://localhost:8000/useravatar/7a893f9aea692eb250efca205');
INSERT INTO `userinfo` VALUES (12, 'testone', '87884934751788477bbe9aa40748c765', 15656256181, '男', '66-222', '测试者', 'http://localhost:8000/useravatar/default.jpg');
INSERT INTO `userinfo` VALUES (13, 'admin', 'a2349c4659e972b9e8c608392a2e1054', NULL, NULL, NULL, NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
