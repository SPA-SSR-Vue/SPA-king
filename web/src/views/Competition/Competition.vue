<template>
  <div class="cp">
    <div class="cp-header">
      <ul class="nav nav-cp d-flex flex-wrap">
        <li
          class="nav-item mx-12"
          :class="{ active: i === index }"
          v-for="(category, index) in cats"
          :key="`cat-${index}`"
          @click="slide(index)"
        >
          <span class="nav-link">{{ category.name }}</span>
        </li>
      </ul>
    </div>
    <div class="cp-body">
      <swiper @slideChange="slideChange" ref="swp" :options="swiperOptions">
        <swiper-slide v-for="(category, i) in cats" :key="`swiper-cat-${i}`">
          <p class="title d-flex ai-center pl-10">
            <span>王者荣耀2020KPL春季赛</span
            ><span class="ml-10 px-5">官方举办</span>
          </p>
          <div class="banner mt-15">
            <img :src="category.banner.coverImg" alt="" />
          </div>
          <div class="news" v-if="ret[i]">
            <div class="t text-center">赛事资讯</div>
            <div class="mx-5">
              <div
                v-for="(news, index) in ret[i].newsList"
                :key="`news-${index}`"
                class="d-flex ai-center"
              >
                <p class="flex-1 fs-14 text-dark-4 text-ellipsis-1">
                  {{ news.title }}
                </p>
                <span class="fs-12 text-gray-3">{{ news.createdAt }}</span>
              </div>
              <div v-if="loading" class="t text-center">正在加载...</div>
              <div
                v-if="!loading && query.page !== 5"
                @click="loadingCatNews"
                class="t text-center"
              >
                上拉加载更多
              </div>
              <div v-if="query.page === 5" class="t text-center">
                已显示全部内容
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      i: 0,
      cats: [],
      ret: [],
      loading: false,
      query: {
        page: 1,
        limit: 10,
      },
      swiperOptions: {},
    };
  },
  computed: {
    swiper() {
      return this.$refs.swp.swiper;
    },
  },
  methods: {
    slide(i) {
      this.i = i;
      this.swiper.slideTo(i);
    },

    slideChange() {
      this.i = this.swiper.realIndex;
      if (!this.ret[this.i]) {
        this.getCatNews(this.cats[this.i]);
      }
    },

    async getCats() {
      const res = await this.$http.get("/competitions", {
        params: {
          category: "competition",
        },
      });
      const data = res.data.map((item, i) => {
        if (item.banner[0]) {
          item.banner = item.banner[0].items[0];
        }
        return item;
      });
      this.cats = data;
    },

    async getCatNews(cat) {
      this.query.page = 1;
      this.query.limit = 10;
      this.loading = true;
      const res = await this.$http.get(`/competitions/${cat._id}`, {
        params: {
          query: this.query,
        },
      });
      this.loading = false;
      this.$set(this.ret, this.i, res.data);
    },

    async loadingCatNews() {
      const currentCat = this.ret[this.i];

      if (this.query.page >= 5) {
        return;
      }
      this.query.page++;
      this.loading = true;
      const res = await this.$http.get(`/competitions/${currentCat._id}`, {
        params: {
          query: this.query,
        },
      });
      this.loading = false;
      // for (const item of res.data.newsList) {
      //   this.cats[this.i].newsList.push(item);
      // }

      // currentCat.newsList = [...currentCat.newsList, ...res.data.newsList];
      currentCat.newsList = currentCat.newsList.concat(res.data.newsList);

      // this.this.ret[this.i].newsList.concat(res.data.newsList);
    },
  },
  async created() {
    await this.getCats();
    await this.getCatNews(this.cats[this.i]);
  },
};
</script>

<style lang="scss">
.cp {
  .cp-header {
    margin: 0 0.16rem 0.3rem 0.16rem;
    overflow-x: scroll;
  }

  .cp-body {
    .title {
      > span:first-child {
        font-size: 0.36rem;
        line-height: 0.52rem;
        color: #00adff;
        font-weight: 600;
      }
      > span:last-child {
        font-size: 0.24rem;
        color: #a2a2a2;
        border: 1px solid #a2a2a2;
        border-radius: 1rem;
      }
    }
    img {
      width: 100%;
    }

    .news {
      p {
        line-height: 0.6rem;
      }

      .t {
        color: #a2a2a2;
        height: 0.56rem;
        line-height: 0.56rem;
        font-size: 0.28rem;
        margin: 0.2rem 0;
        background: #e4e4e4;
      }
    }
  }
}

.nav {
  &.nav-cp {
    width: 10.8rem;
    height: 0.8rem;
    line-height: 0.72rem;
    font-size: 0.26rem;
    .nav-item:first-child {
      margin-left: 0;
    }
  }
}
</style>
