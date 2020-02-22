<template>
  <div class="bg-gray-b">
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
      <nav>
        <ul class="nav entry d-flex flex-wrap ai-center">
          <li
            class="nav-item w25 d-flex flex-column ai-center jc-center my10"
            v-for="(entry, index) in entryItems"
            :key="index"
          >
            <i :class="entry.spriteClass"></i>
            <router-link class="navlink fs12 text-dark-5 mt5" :to="entry.path">{{entry.name}}</router-link>
          </li>
        </ul>
      </nav>
      <div class="entry-btn d-flex jc-center ai-center">
        <i class="sprite sprite-arrow"></i>
        <div class="fs12 text-dark-4">收起</div>
      </div>
    </div>

    <!-- end of home nav entry -->

    <div v-for="n in 30" :key="n">1</div>
  </div>
</template>

<script>
export default {
  name: "ViewHome",
  data() {
    return {
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

      entryItems: [
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
  i {
    margin-right: 0.06rem;
  }
}
</style>