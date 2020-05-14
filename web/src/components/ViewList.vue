<template>
  <div>
    <ul class="nav d-flex ai-center jc-between fs-13 text-dark-3 mb-15">
      <li
        class="nav-item"
        :class="[{ active: $refs.swiper.swiper.realIndex === i }]"
        v-for="(item, i) in data"
        :key="i"
        @click="$refs.swiper.swiper.slideTo(i)"
      >
        <router-link class="nav-link" to>{{ item.name }}</router-link>
      </li>
    </ul>
    <div class="swiper">
      <swiper ref="swiper" :options="options">
        <swiper-slide v-for="(item, i) in data" :key="i">
          <slot name="items" :item="item"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewList",
  props: {
    data: { type: Array, required: true },
    options: {
      type: Object,
      default: () => ({
        autoHeight: true,
      }),
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss"></style>
