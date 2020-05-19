<template>
  <div class="card px-18 mt-12 mb-10 bb-1 bg-white">
    <div class="card-header" :class="{ 'bb-1 mb-12': !simple }">
      <div class="card-header-inner d-flex ai-center py-15 lh-12">
        <span :class="`sprite sprite-${icon1}`"></span>
        <div class="flex-1 fs-16 ml-5 title">{{ title }}</div>
        <span v-if="!simple" :class="`sprite sprite-${icon2}`"></span>
      </div>
      <slot name="banner"></slot>
    </div>

    <div class="card-body">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewCard",
  props: {
    icon1: { type: String, default: "news" },
    title: { type: String, default: "标题" },
    icon2: { type: String },
    simple: { type: Boolean, default: false },
  },
};
</script>
