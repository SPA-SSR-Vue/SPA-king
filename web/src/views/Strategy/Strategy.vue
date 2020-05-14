<template>
  <div>
    <!-- start of strategy banner swiper -->
    <div class="banner banner-strategy mb-10">
      <swiper class="swiper swiper-strategy" :options="swiperOptions">
        <swiper-slide
          v-for="(item, index) in strategyBanner.items"
          :key="index"
        >
          <router-link :to="item.targetUrl">
            <img class="w-100 h-100" :src="item.coverImg" alt />
          </router-link>
        </swiper-slide>
        <div class="swiper-pagination text-right" slot="pagination"></div>
      </swiper>
    </div>
    <!-- end of strategy banner swiper -->
  </div>
</template>

<script>
export default {
  name: "ViewStrategy",
  data() {
    return {
      strategyBanner: [
        {
          name: "",
          items: "",
        },
      ],
      swiperOptions: {
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        autoplay: {
          delay: 2500,
        },
      },
    };
  },

  methods: {
    async fetchStrategyBanner() {
      const res = await this.$http("/banners", {
        params: {
          name: "strategy",
        },
      });
      this.strategyBanner = res.data;
    },
  },

  created() {
    this.fetchStrategyBanner();
  },
};
</script>

<style lang="scss" scoped></style>
