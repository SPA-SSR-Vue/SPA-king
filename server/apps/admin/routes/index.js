module.exports = app => {
  // router
  require("./crud")(app);
  require("./auth")(app);
  require("./upload")(app);

  const Category = require("./../../../libs/db/models/Category");
  const Article = require("./../../../libs/db/models/Article");
  app.use("/w/init/news", async (req, res, next) => {
    const cat = await Category.findOne({ name: "KPL" });

    let n = [
      {
        title: "你是赛评师：TS全员在线零封RNG.M锁定季后赛，他们为什么这么强？",
      },
      {
        title:
          "春季赛快讯：TS强势零封RNG.M锁定季后赛，暖阳娜可露露封神表现带飞全场",
      },
      { title: "【简讯】TS晋级2020年KPL春季赛季后赛" },
      { title: "参与KPL助威赢腾讯视频vip年卡、王者手办，助力战队上腾讯视频" },
      {
        title:
          "你是赛评师：YTG晴一狂暴貂蝉无畏突脸力克成都AG，YTG越塔干你的青春回来了吗",
      },
      {
        title: "春季赛快讯：YTG3：1力克成都AG超玩会，强开突脸的平头哥无所畏惧",
      },
      {
        title:
          "你是赛评师：LGD大鹅.清凡鲁班大师极限守家守护胜利，GK为什么“吃鹅”失败？",
      },
      { title: "春季赛快讯：LGD大鹅决胜局击败GK，晨阳镜如入无人之境横扫战场" },
      {
        title:
          "你是赛评师：DYG力克重庆QG锁定季后赛，重庆QG打架队两连败的问题是什么？",
      },
      { title: "春季赛快讯：DYG战术压制击败重庆QG，重庆QG打架队难求一胜" },
      { title: "【简讯】DYG晋级2020年KPL春季赛季后赛" },
      {
        title:
          "春季赛快讯：VG击败广州TTG.XQ再积一分，萌神不萌张飞先手开团引领节奏",
      },
      { title: "【简讯】南京Hero久竞、上海EDG.M遗憾无缘2020年KPL春季赛季后赛" },
      { title: "嘴强王者：赛场上的来与去，如何看待KPL人员变更？" },
      { title: "【KPL今日预报】DYG vs 重庆QGhappy，宿敌相遇谁能取胜？" },
      {
        title:
          "王者电竞周刊：成都AG领跑西部率先锁定季后赛，一诺百里玄策梦魇钩索取三杀",
      },
      {
        title:
          "2020年KPL春季赛第八周周最佳出炉：LGD大鹅.清凡、GK.青枫斩获最佳选手",
      },
      { title: "2020年KPL春季赛常规赛第八周王牌选手" },
      { title: "2020年KPL春季赛季后赛赛程赛制公布，5月28日16:00热血开战" },
      { title: "你是赛评师：TS打破魔咒零封武汉ES，武汉ES现在最需要的是什么？" },
      {
        title:
          "春季赛快讯：TS破除不胜魔咒零封武汉ES，暖阳赵云喜提“电竞容嬷嬷”称号",
      },
      {
        title:
          "你是赛评师：LGD大鹅.君诏半肉马超不走寻常路，全程高能对决DYG为何败北？",
      },
      {
        title:
          "春季赛快讯：LGD大鹅力克DYG双方神仙打架全程高能，君诏半肉马超无敌顶",
      },
      { title: "春季赛快讯：RW侠强势出击零封WE，渡劫橘右京超神杀戮" },
      {
        title:
          "你是赛评师：武汉ES被广州TTG.XQ零封惨遭三连败，他们的问题出在哪里？",
      },
      { title: "春季赛快讯：广州TTG.XQ强势零封武汉ES，冰尘辅助位局最佳两连" },
      { title: "你是赛评师：重庆QG全员轮换难敌RNG.M，风格改变实力变了吗？" },
      { title: "春季赛快讯：RNG.M3：1力克重庆QG，凉晨廉颇走边表现出色" },
      {
        title: "春季赛快讯：GK让一追三TES，鹏鹏成吉思汗三杀扭转局势拒绝决胜局",
      },
      {
        title:
          "你是赛评师：成都AG一诺百里玄策三杀逆转战局，零封DYG锁定季后赛的他们在线等夸",
      },
      { title: "【简讯】成都AG超玩会晋级2020年KPL春季赛季后赛" },
      {
        title:
          "春季赛快讯：成都AG强势零封DYG率先锁定西部季后赛，一诺百里玄策三杀逆转战局",
      },
      {
        title: "你是赛评师：南京Hero让一追三VG，存留晋级希望的他们哪里变强了？",
      },
      { title: "春季赛快讯：南京Hero让一追三VG，尘夏再转边路狂铁无人可挡" },
      { title: "【简讯】RNG.M晋级2020年KPL春季赛季后赛" },
      { title: "【KPL今日预报】成都AG超玩会 vs DYG，谁是西部最强王者？" },
      { title: "你是赛评师：LGD大鹅全员英雄海强势零封WE，他们应该如何针对？" },
      { title: "春季赛快讯：LGD大鹅实力强劲零封WE，全员换位无法针对" },
      { title: "春季赛快讯：DYG3-0平推YTG，久诚嬴政压制全场" },
      { title: "春季赛快讯：GK速战零封南京Hero久竞，鹏鹏虞姬真射手在线收割" },
      {
        title:
          "你是赛评师：广州TTG.XQ.九尾周瑜绕后强开团，零封YTG的他们状态回升了吗？",
      },
      {
        title:
          "春季赛快讯：广州TTG.XQ强势零封YTG状态火热，九尾周瑜东风浩荡开团凶猛",
      },
      { title: "常规赛第七周人气战队——成都AG超玩会，人气选手——武汉eStar.Cat" },
      { title: "KPL春季赛鱼你说第七期：WE厚积薄发，LGD大鹅晋级季后赛" },
      { title: "【KPL今日预报】南京Hero久竞 vs GK，最后的曙光" },
      {
        title:
          "2020年KPL春季赛第七周周最佳出炉：VG.易瞳、TS.暖阳斩获东西部最佳选手",
      },
      { title: "2020年KPL春季赛常规赛第七周王牌选手" },
      {
        title:
          "你是赛评师：RNGM.晚秋赵云力挽狂澜赢下决胜团战，望月草的轮换你给几分？",
      },
      { title: "春季赛快讯：RNG.M强势出击战胜武汉ES，新秀轮换表现抢眼" },
      {
        title:
          "春季赛快讯：成都AG力克TES暂居西部首位，爱思苏烈、鲁班大师团战拉扯优秀",
      },
    ];

    n = n.map(item => ({
      title: item.title,
      categories: [cat._id],
    }));
    // await Article.insertMany(n);
    // res.send(n);
  });
};
