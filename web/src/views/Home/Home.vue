<template>
  <div class="home bg-gray-bg">
    <!-- start of home banner swiper -->
    <div class="banner banner-home mb-10">
      <swiper class="swiper swiper-home" :options="swiperOptions">
        <swiper-slide
          v-for="(item, index) in homeBanner.items"
          :key="`swiper-${index}`"
        >
          <router-link :to="item.targetUrl">
            <img
              class="w-100 h-100"
              v-lazy="item.coverImg"
              data-lazy="true"
              alt
            />
          </router-link>
        </swiper-slide>
        <div class="swiper-pagination text-right" slot="pagination"></div>
      </swiper>
    </div>
    <!-- end of home banner swiper -->

    <!-- start of home nav entry -->
    <div class="text-center bg-white bt-1 bb-1 mb-10">
      <nav :style="{ height: isShow ? '5.6rem' : '1.4rem' }" class="bfc">
        <ul class="nav nav-entry d-flex flex-wrap ai-center">
          <li
            class="nav-item w-25 d-flex flex-column ai-center jc-center my-10"
            v-for="(entry, index) in entryNavItems"
            :key="`home-nav-${index}`"
          >
            <span :class="entry.spriteClass"></span>
            <router-link
              class="nav-link fs-12 text-dark-5 mt-5"
              :to="entry.path"
              >{{ entry.name }}</router-link
            >
          </li>
        </ul>
      </nav>
      <div
        class="btn btn-spread d-flex jc-center ai-center bg-gray-bg-1"
        @click="isShow = !isShow"
      >
        <span
          class="sprite"
          :class="isShow ? 'sprite-arrow' : 'sprite-arrow-inverse'"
        ></span>
        <div class="fs-12 text-dark-4">{{ isShow ? "收起" : "展开" }}</div>
      </div>
    </div>
    <!-- end of home nav entry -->

    <!-- start of newsList -->
    <view-card class="card-news" icon1="news" title="新闻资讯">
      <template #body>
        <view-list :data="news">
          <template #items="{item}">
            <router-link
              class="d-flex ai-center mb-15"
              v-for="(news, index) in item.newsList"
              :key="`news-${index}`"
              :to="`/articles/${news._id}`"
              style="line-height: 0.38rem"
            >
              <span class="fs-14 text-blue-1">[{{ news.category }}]</span>
              <span class="mx-2">|</span>
              <p class="flex-1 fs-14 text-ellipsis-1">{{ news.title }}</p>
              <span class="fs-12">{{ news.createdAt | day("MM/DD") }}</span>
            </router-link>
          </template>
        </view-list>
      </template>
    </view-card>
    <!-- end of newsList -->

    <!-- start of heroList -->
    <view-card class="card-hero" icon1="hero" title="英雄列表">
      <template #banner>
        <div
          class="banner banner-hero"
          v-for="(item, index) in heroBanner.items"
          :key="`banner-${index}`"
        >
          <router-link :to="item.targetUrl">
            <img v-lazy="item.coverImg" data-lazy="true" alt />
          </router-link>
        </div>
      </template>
      <template #body>
        <view-list :data="heroes">
          <template #items="{item}">
            <div class="hero-list d-flex flex-wrap ai-center text-center pb-15">
              <router-link
                class="hero w-20"
                v-for="(hero, index) in item.heroList"
                :key="`hero-${index}`"
                :to="`/heroes/${hero._id}`"
              >
                <img v-lazy="hero.avatar" data-lazy="true" alt="hero avatar" />
                <h3 class="text-gray-3 fs-12 fw-500 mt-5">{{ hero.name }}</h3>
              </router-link>
            </div>
          </template>
        </view-list>
      </template>
    </view-card>
    <!-- end of heroList -->

    <!-- start of videoList -->
    <view-card class="card-video" icon1="video" title="精彩视频">
      <template #body>
        <view-list :data="videos">
          <template #items="{item}">
            <div class="video-list">
              <div class="d-flex flex-wrap ai-center">
                <router-link
                  class="video w-50"
                  v-for="(video, index) in item.videoList"
                  :key="`video-${index}`"
                  :to="`/videos/${video._id}`"
                >
                  <img v-lazy="video.coverImg" data-lazy="true" alt />
                  <h3
                    class="video-title text-dark-3 text-ellipsis-2 fs-13 fw-500"
                  >
                    {{ video.title }}
                  </h3>
                  <div class="video-info d-flex ai-center">
                    <span class="sprite sprite-video"></span>
                    <span class="flex-1 fs-10 text-gray-4">{{ 10 }}万</span>
                    <span class="fs-10 text-gray-4">{{
                      video.createdAt | day("MM-DD")
                    }}</span>
                  </div>
                </router-link>
              </div>
              <div
                class="btn btn-video text-center text-gray-5 fs-12"
                @click="$router.push('/strategy')"
              >
                点击查看更多
              </div>
            </div>
          </template>
        </view-list>
      </template>
    </view-card>
    <!-- end of videoList -->

    <!-- start of strategyList -->
    <!-- <view-card class="card-strategy" icon1="strategy" title="图文攻略">
      <template #body>
        <view-list :data="strategies">
          <template #items="{item}">
            <div class="strategy-list">
              <router-link
                class="strategy d-flex pb-5 mb-10 bb-1 w-100"
                v-for="(strategy, index) in item.strategyList"
                :key="`strategy-${index}`"
                :to="`/articles/${strategy._id}`"
              >
                <img
                  class="w-40 mr-10"
                  v-lazy="strategy.coverImg"
                  data-lazy="true"
                  alt
                />
                <div class="strategy-info bfc d-flex flex-column jc-between">
                  <p class="text-ellipsis-1 fs-15">{{ strategy.title }}</p>
                  <p class="fs-12 text-gray-4 text-ellipsis-2">
                    {{ strategy.description }}
                  </p>
                  <span class="fs-8 text-gray-2">{{
                    strategy.createdAt.slice(5, 10)
                  }}</span>
                </div>
              </router-link>
            </div>
          </template>
        </view-list>
      </template>
    </view-card> -->

    <view-strategy-card></view-strategy-card>
    <!-- end of strategyList -->
  </div>
</template>

<script>
import axios from "axios";
import { getBanner, getArticles, getResources } from "./../../api";
import ViewStrategyCard from "./../../components/ViewStrategyCard";

export default {
  name: "ViewHome",
  components: { ViewStrategyCard },
  data() {
    return {
      isShow: false,
      homeBanner: {
        name: "",
        items: [],
      },
      heroBanner: {
        name: "",
        items: [],
      },
      news: [],
      heroes: [],
      videos: [],
      strategies: [],
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination",
        },
        autoplay: {
          delay: 2500,
        },
      },

      entryNavItems: [
        { spriteClass: "sprite sprite-blz", name: "爆料站", path: "/" },
        { spriteClass: "sprite sprite-story", name: "故事站", path: "/" },
        { spriteClass: "sprite sprite-shop", name: "周边商城", path: "/" },
        { spriteClass: "sprite sprite-exp", name: "体验服", path: "/" },
        { spriteClass: "sprite sprite-new", name: "新人专区", path: "/" },
        { spriteClass: "sprite sprite-book", name: "荣耀·传承", path: "/" },
        { spriteClass: "sprite sprite-fight", name: "模拟战资料库", path: "/" },
        { spriteClass: "sprite sprite-camp", name: "王者营地", path: "/" },
        { spriteClass: "sprite sprite-wx", name: "公众号", path: "/" },
        { spriteClass: "sprite sprite-version", name: "版本介绍", path: "/" },
        { spriteClass: "sprite sprite-env", name: "对局环境", path: "/" },
        { spriteClass: "sprite sprite-team", name: "无线王者团", path: "/" },
        {
          spriteClass: "sprite sprite-interact",
          name: "创意互动营",
          path: "/",
        },
      ],
    };
  },

  methods: {
    async fetchBanner() {
      const res = await axios.all([
        getBanner({
          name: "home",
        }),
        getBanner({
          name: "hero",
        }),
      ]);

      this.homeBanner = res[0].data;
      this.heroBanner = res[1].data;
    },

    async fetchCatsData() {
      const res = await axios.all([
        getResources("articles", {
          category: "news",
        }),
        getResources("articles", {
          category: "strategy",
        }),
        getResources("heroes", {
          category: "hero",
        }),
        getResources("videos", {
          category: "video",
        }),
      ]);

      this.news = res[0].data;
      this.strategies = res[1].data;
      this.heroes = res[2].data;
      this.videos = res[3].data;
    },
  },

  created() {
    this.fetchBanner();
    this.fetchCatsData();
  },
};
</script>

<style lang="scss">
@import "./../../assets/scss/helper";
.home {
  .mx-2 {
    margin: 0 0.04rem;
  }
}

.nav {
  &.nav-entry {
    .nav-item {
      height: 1rem;
      border-bottom: none;
      @include sde(1px, 100%, $border-color, 0, 0, auto, auto, scaleX(0.5));
      &:nth-of-type(4n) {
        @include sde(0px, 0px);
      }
    }
  }
}

.banner {
  &.banner-hero {
    margin-bottom: 0.12rem;
    img {
      width: 100%;
    }
  }
  &.banner-home,
  &.banner-strategy {
    a {
      display: block;
      height: 3.38rem;
    }
  }
}

.card {
  padding: 0 0.34rem;
  &.card-news {
    a {
      line-height: 0.38rem;
    }
  }

  &.card-hero {
    .hero-list {
      margin: 0 -0.16rem;
      .hero {
        padding: 0 0.14rem;
        height: 1.74rem;
        h3 {
          padding: 0.02rem 0 0.1rem 0;
        }
        img {
          width: 100%;
        }
      }
    }
  }

  &.card-video {
    .video-list {
      margin-right: -0.1rem;
      .video {
        padding: 0 0.1rem 0.1rem 0;
        margin-bottom: 0.24rem;
        .video-title {
          margin: 0.06rem 0;
        }
        img {
          width: 100%;
          height: 1.9rem;
          border-radius: 0.04rem;
        }
      }
    }
  }

  &.card-strategy {
    img {
      height: 1.4rem;
      width: 2.32rem;
    }
    .strategy-info {
      width: 3.8rem;
      height: 1.5rem;
    }
  }
}

.btn {
  &.btn-spread {
    height: 0.6rem;
    line-height: 0.6rem;
    span {
      margin-right: 0.06rem;
    }
  }
  &.btn-video {
    text-align: center;
    height: 0.7rem;
    line-height: 0.7rem;
  }
}
</style>
