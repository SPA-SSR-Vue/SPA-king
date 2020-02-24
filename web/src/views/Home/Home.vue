<template>
  <div class="bg-gray-bg">
    <!-- start of home swiper -->
    <div class="home-swiper mb10">
      <swiper :options="swiperOptions">
        <swiper-slide v-for="(item, index) in model.items" :key="index">
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
      <nav :style="{height: isShow ? '5.6rem' : '1.4rem'}" class="bfc">
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
        <span class="sprite" :class="isShow ? 'sprite-arrow' : 'sprite-arrow-inverse'"></span>
        <div class="fs12 text-dark-4">{{isShow ? '收起' : '展开'}}</div>
      </div>
    </div>
    <!-- end of home nav entry -->

    <!-- start of newsList -->
    <view-card :data="news" icon="news" title="新闻资讯">
      <template #content="{category}">
        <div
          class="d-flex ai-center mb15"
          v-for="(news, index) in category.newsList"
          :key="index"
          style="line-height: 0.38rem"
        >
          <span class="fs14 text-blue-2">[{{news.category}}]</span>
          <p class="flex-1 fs14 text-ellipsis">{{news.title}}</p>
          <span class="fs12">{{news.createdAt}}</span>
        </div>
      </template>
    </view-card>
    <!-- end of newsList -->

    <!-- start of heroList -->
    <view-card :data="heroes" icon="hero" title="英雄列表">
      <template #banner>
        <div class="hero-banner">
          <img src="./../../assets/images/20796372351730.jpg" alt />
        </div>
      </template>
      <template #content="{category}">
        <div class="d-flex flex-wrap ai-center text-center" style="margin:0 -4px">
          <div class="w20 mb5" v-for="(hero, index) in category.heroList" :key="index">
            <img :src="hero.avatar" alt width="90%" />
            <h3 class="text-gray-3 fs12 fw500">{{hero.name}}</h3>
          </div>
        </div>
      </template>
    </view-card>
    <!-- end of heroList -->

    <!-- start of videoList -->
    <view-card :data="videos" icon="video" title="精彩视频">
      <template #content="{category}">
        <div class="video d-flex flex-wrap ai-center" v-if="category">
          <div class v-for="(video, index) in category.videoList" :key="index">
            <img class="mb5" :src="video.cover" alt width="100%" />
            <h3 class="text-gray-3 text-ellipsis-2 fs13 fw500">{{video.title}}</h3>
            <div class="d-flex ai-center pt5 mb18" style="height: 15px;line-height: 15px">
              <span class="sprite sprite-video"></span>
              <span class="flex-1 fs10 text-gray-4">{{10}}万</span>
              <span class="fs10 text-gray-4">{{video.createdAt.slice(5,10)}}</span>
            </div>
          </div>
        </div>
      </template>
    </view-card>
    <div class="btn-video text-center text-gray-5 fs12">点击查看更多</div>
    <!-- end of videoList -->

    <!-- start of strategyList -->
    <view-card :data="strategies" icon="strategy" title="图文攻略">
      <template #content="{category}">
        <div class="mt10">
          <div class="d-flex mt5" v-for="(item, index) in category.strategyList" :key="index">
            <img  class="w33 mr5" :src="item.cover" alt="">
            <div>
              <p>{{item.title}}</p>
              <p>{{item.description}}</p>
            </div>
            <div>

            </div>
          </div>


        </div>


      </template>
    </view-card>
    <!-- end of strategyList -->

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
        name: "",
        items: []
      },
      news: [],
      heroes: [],
      videos: [],
      strategies: [],
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
      ]
    };
  },

  methods: {
    async fetchHomeBanner() {
      const res = await this.$http("/banner", {
        params: {
          name: "home"
        }
      });
      this.model = Object.assign({}, this.model, res.data.data);
    },

    async fetchNews() {
      const res = await this.$http("/article", {
        params: {
          category: "news"
        }
      });
      this.news = res.data.data;
    },

    async fetchHeroes() {
      const res = await this.$http("/hero", {
        params: {
          category: "hero"
        }
      });
      this.heroes = res.data.data;
    },
    async fetchVideos() {
      const res = await this.$http("/video", {
        params: {
          category: "video"
        }
      });
      this.videos = res.data.data;
    },
    async fetchStrategies() {
      const res = await this.$http("/article", {
        params: {
          category: "strategy"
        }
      });
      this.strategies = res.data.data;
    }
  },

  created() {
    this.fetchHomeBanner();
    this.fetchNews();
    this.fetchHeroes();
    this.fetchVideos();
    this.fetchStrategies();
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

.video {
  > div {
    width: 49.1%;
    &:nth-of-type(2n + 1) {
      margin-right: 5px;
    }
  }
}

.btn-video {
  height: 0.7rem;
  line-height: 0.7rem;
}
</style>