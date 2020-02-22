<template>
  <div class="card px18 mt12 mb10 bb1 bg-white">
    <div class="card-header bb1 mb12">
      <div class="d-flex ai-center py15" style="line-height: 1.2">
        <span :class="`sprite sprite-${icon}`"></span>
        <div class="flex-1 fs16 ml5">{{title}}</div>
        <span class="sprite sprite-more"></span>
      </div>
      <slot name="banner"></slot>
    </div>

    <div class="card-body">
      <nav class="mb15" style="line-height: 0.46rem">
        <ul class="nav d-flex jc-between fs13 ai=center">
          <li class="nav-item" v-for="(item, index) in data" :key="index">
            <router-link class="nav-link" to="/">{{item.categoryName}}</router-link>
          </li>
        </ul>
      </nav>
      <div class="swiper">
        <swiper :options="swiperOptions">
          <swiper-slide v-for="(item, index) in data" :key="index">
            <slot name="content" :category="item"></slot>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewCard",
  props: {
    icon: { type: String, default: "news" },
    title: { type: String, default: "标题" },
    data: { type: Array, required: true },
    swiperOptions: { type: Object, default: () => {} }
  }
};
</script>

<style lang="scss" scoped>
</style>
