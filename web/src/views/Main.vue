<template>
  <div>
    <header class="d-flex ai-center sprite sprite-top-bg fixed">
      <router-link to="/" class="sprite sprite-logo ml-18 mr-12"></router-link>
      <div class="text-white flex-1">
        <p class="fs-13">王者荣耀</p>
        <p class="fs-8 text-gray-6">团队成就更多</p>
      </div>
      <div class="btn btn-download sprite sprite-btn-download mr-15"></div>
    </header>
    <main>
      <nav class="bg-primary text-white text-center fs-13">
        <ul class="nav nav-home d-flex jc-around ai-center">
          <li
            class="nav-item"
            :class="{ active: $route.path === item.path }"
            v-for="(item, index) in nav"
            :key="index"
          >
            <router-link class="nav-link" :to="item.path">{{
              item.name
            }}</router-link>
          </li>
        </ul>
      </nav>
      <router-view :key="$route.path"></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: "ViewMain",
  data() {
    return {
      nav: [
        { name: "首页", path: "/" },
        { name: "攻略中心", path: "/strategy" },
        { name: "赛事中心", path: "/competition" },
      ],
    };
  },
};
</script>

<style lang="scss">
@import "./../assets/scss/helper";
main {
  margin-top: 0.9rem;
}

.nav {
  &.nav-home {
    height: 0.88rem;
    .nav-item {
      &.active {
        color: map-get($colors, white);
        border-bottom: 0.06rem solid map-get($colors, white);
      }
    }
  }
}

.btn {
  &.btn-download {
    position: relative;
    top: -0.04rem;
  }
}
</style>
