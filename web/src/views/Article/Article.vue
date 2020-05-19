<template>
  <div class="news">
    <div class="news-title d-flex ai-center px-5 mb-5">
      <span @click="$router.go(-1)" class="icon icon-back"></span>
      <p class="flex-1 text-blue fs-14 fw-600 ml-10 text-ellipsis-1">
        {{ news.title }}
      </p>
      <span class="fs-10 text-gray-2">2020-05-14</span>
    </div>
    <div class="news-content">
      <div v-html="news.content"></div>
    </div>
    <div class="news-links pl-18">
      <div class="title d-flex ai-center">
        <span class="icon icon-link"></span
        ><span class="text-blue ml-5 fs-12 fw-600">相关资讯</span>
      </div>
      <div>
        <router-link
          class="d-flex ai-center"
          v-for="(item, index) in linkItems"
          :key="`link-item-${index}`"
          :to="`/articles/${item._id}`"
        >
          <p class="flex-1 fs-12 text-black text-ellipsis-1">
            {{ item.title }}
          </p>
          <span class="text-gray-2">2020-05-14</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Article",
  props: {
    id: { type: String },
  },
  data() {
    return {
      news: {},
      linkItems: [],
    };
  },
  methods: {
    async getArticle() {
      const res = await this.$http.get(`/articles/${this.id}`);
      this.news = res.data.article;
      this.linkItems = res.data.linkItems;
    },
  },
  created() {
    this.getArticle();
  },
};
</script>

<style lang="scss">
@import "./../../assets/scss/helper";
.news {
  .news-title {
    height: 0.8rem;
    border-bottom: 1px solid map-get($colors, gray-1);
  }
  .news-content {
    padding: 10px 18px 18px 18px;
  }
  .news-links {
  }
}

.icon {
  &.icon-back {
    @include bgImg(12px, 18px, "./../../assets/images/backBg.png");
  }

  &.icon-link {
    @include bgImg(18px, 22px, "./../../assets/images/lin.png");
  }
}
</style>
