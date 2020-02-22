<template>
  <div class="home">
    <header class="d-flex ai-center sprite sprite-top-bg">
      <router-link to="/" class="sprite sprite-logo ml18 mr12"></router-link>
      <div class="text-white flex-1">
        <p class="fs13">王者荣耀</p>
        <p class="fs8 text-gray-6">团队成就更多</p>
      </div>
      <div class="btn sprite sprite-btn-download mr15"></div>
    </header>
    <main>
      <nav class="bg-primary text-white text-center fs13">
        <ul class="nav main d-flex jc-around ai-center">
          <li class="nav-item">
            <router-link class="nav-link" to="/">首页</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/strategy">攻略中心</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/competition">赛事中心</router-link>
          </li>
        </ul>
      </nav>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: "ViewMain"
};
</script>

<style scoped lang="scss">
.home {
  header {
    .btn {
      position: relative;
      top: -0.04rem;
    }
  }
}
</style>
