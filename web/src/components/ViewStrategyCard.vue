<template>
  <div>
    <view-card class="card-strategy" icon1="strategy" title="图文攻略">
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
                    strategy.createdAt | day("MM-DD")
                  }}</span>
                </div>
              </router-link>
            </div>
          </template>
        </view-list>
      </template>
    </view-card>
  </div>
</template>

<script>
import { getResources } from "./../api";

export default {
  name: "ViewStrategyCard",
  data() {
    return {
      strategies: [],
    };
  },
  methods: {
    async getStrategies() {
      const res = await getResources("articles", {
        category: "strategy",
      });
      this.strategies = res.data;
    },
  },
  created() {
    this.getStrategies();
  },
};
</script>

<style lang="scss">
.card {
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
</style>
