<template>
  <div class="bg-gray-bg">
    <!-- start of home swiper -->
    <div class="home-swiper mb10">
      <swiper :options="swiperOptions">
        <swiper-slide v-for="(item, index) in model.banner.items" :key="index">
          <router-link :to="item.targetUrl">
            <img class="w100 h100" :src="item.imgUrl" alt />
          </router-link>
        </swiper-slide>
        <div
          id="pagination"
          class="custom-pagination swiper-pagination text-right"
          slot="pagination"
        ></div>
      </swiper>
    </div>
    <!-- end of home swiper -->

    <!-- start of home nav entry -->
    <div class="home-nav text-center bg-white bt1 bb1 mb10">
      <nav :style="{height: isShow ? '1.4rem' : '5.6rem'}" style="overflow:hidden">
        <ul class="nav entry d-flex flex-wrap ai-center">
          <li
            class="nav-item w25 d-flex flex-column ai-center jc-center my10"
            v-for="(entry, index) in entryNavItems"
            :key="index"
          >
            <span :class="entry.spriteClass"></span>
            <router-link class="navlink fs12 text-dark-5 mt5" :to="entry.path">{{entry.name}}</router-link>
          </li>
        </ul>
      </nav>
      <div class="entry-btn d-flex jc-center ai-center bg-gray-bg1" @click="()=> isShow = !isShow">
        <span class="sprite" :class="isShow ? 'sprite-arrow-inverse' : 'sprite-arrow'"></span>
        <div class="fs12 text-dark-4">{{isShow ? '展开': '收起'}}</div>
      </div>
    </div>
    <!-- end of home nav entry -->

    <!-- start of newsList -->
    <div class="card px18 mt12 mb10 bb1 bg-white">
      <div class="card-header d-flex ai-center bb1 py15 mb12">
        <span class="sprite sprite-news"></span>
        <div class="flex-1 fs15 ml5">新闻资讯</div>
        <span class="sprite sprite-more"></span>
      </div>
      <div class="card-body">
        <nav class="mb15">
          <ul class="nav d-flex jc-between fs12 ai=center">
            <li class="nav-item" v-for="(item, index) in newsNavItems" :key="index">
              <router-link class="nav-link" :to="item.path">{{item.categoryName}}</router-link>
            </li>
          </ul>
        </nav>
        <div class="swiper">
          <swiper :options="swiperOptions1">
            <swiper-slide v-for="(news, index) in newsNavItems" :key="index">
              <div
                class="d-flex ai-center mb15"
                v-for="(item, index) in news.newsList"
                :key="index"
              >
                <span class="category fs13">[{{item.category}}]</span>
                <p class="flex-1 fs13">{{item.title}}</p>
                <span class="fs10">{{item.date}}</span>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
    <!-- end of newsList -->

    <view-card :data="newsNavItems" title="新闻资讯">
      <template #banner>
        <div class="hero-banner">
          <img src="./../../assets/images/20796372351730.jpg" alt />
        </div>
      </template>
      <template #content="{category}">
        <div
          class="d-flex ai-center mb15"
          v-for="(news, index) in category.newsList"
          :key="index"
          style="line-height: 0.38rem"
        >
          <span class="fs14">[{{news.category}}]</span>
          <p class="flex-1 fs14">{{news.title}}</p>
          <span class="fs12">{{news.date}}</span>
        </div>
      </template>
    </view-card>

    <!-- <div class="d-flex ai-center mb15" v-for="(item, index) in news.newsList" :key="index">
      <span class="category fs13">[{{item.category}}]</span>
      <p class="flex-1 fs13">{{item.title}}</p>
      <span class="fs10">{{item.date}}</span>
    </div>-->
    <div v-for="n in 30" :key="n">1</div>
  </div>
</template>

<script>
export default {
  name: "ViewHome",
  data() {
    return {
      isShow: false,
      model: {
        banner: {
          items: []
        }
      },
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination"
        },
        autoplay: {
          delay: 2000
        }
      },

      swiperOptions1: {},

      entryNavItems: [
        { spriteClass: "sprite sprite-blz", name: "爆料站", path: "/" },
        { spriteClass: "sprite sprite-gsz", name: "故事站", path: "/" },
        { spriteClass: "sprite sprite-blz", name: "周边商城", path: "/" },
        { spriteClass: "sprite sprite-blz", name: "体验服", path: "/" },
        { spriteClass: "sprite sprite-blz", name: "新人专区", path: "/" },
        { spriteClass: "sprite sprite-blz", name: "荣耀·传承", path: "/" },
        { spriteClass: "sprite sprite-blz", name: "模拟战资料库", path: "/" },
        { spriteClass: "sprite sprite-blz", name: "王者营地", path: "/" },
        { spriteClass: "sprite sprite-blz", name: "公众号", path: "/" },
        { spriteClass: "sprite sprite-blz", name: "版本介绍", path: "/" },
        { spriteClass: "sprite sprite-blz", name: "对局环境", path: "/" },
        { spriteClass: "sprite sprite-blz", name: "无线王者团", path: "/" },
        { spriteClass: "sprite sprite-blz", name: "创意互动营", path: "/" }
      ],

      newsNavItems: [
        {
          categoryName: "热门",
          path: "/",
          newsList: new Array(5).fill({
            category: "公告",
            title: "2月18日全服不停机更新公告",
            date: "02/17"
          })
        },
        {
          categoryName: "新闻",
          path: "/",
          newsList: new Array(5).fill({
            category: "公告",
            title: "2月18日全服不停机更新公告",
            date: "02/17"
          })
        },
        {
          categoryName: "公告",
          path: "/",
          newsList: new Array(5).fill({
            category: "公告",
            title: "2月18日全服不停机更新公告",
            date: "02/17"
          })
        },
        {
          categoryName: "活动",
          path: "/",
          newsList: new Array(5).fill({
            category: "公告",
            title: "2月18日全服不停机更新公告",
            date: "02/17"
          })
        },
        {
          categoryName: "赛事",
          path: "/",
          newsList: new Array(5).fill({
            category: "公告",
            title: "2月18日全服不停机更新公告",
            date: "02/17"
          })
        }
      ]
    };
  },

  methods: {
    async fetchBanner() {
      const res = await this.$http("/home/banner", {
        params: {
          query: {
            where: { "banner.name": "home" }
          }
        }
      });
      this.model = Object.assign({}, this.model, res.data.data);
    }
  },

  created() {
    this.fetchBanner();
  }
};
</script>

<style lang="scss" scoped>
.entry-btn {
  height: 0.6rem;
  line-height: 0.6rem;
  span {
    margin-right: 0.06rem;
  }
}

.card {
  .swiper-container {
    .category::after {
      display: block;
      content: 0;
      width: 10px;
      height: 10px;
      background-color: #000;
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}

.hero-banner {
  // font-size: 0;
  // margin-top: -15px;
  margin-bottom: 6px;
  img {
    width: 100%;
  }
}
</style>