<template>
  <div class="video">
    <div class="video-wrap">
      <video src=""></video>
    </div>
    <div class="video-infor">
      <div class="d-flex ai-center ">
        <div class="avatar mr-5">
          <img src="" alt="" />
        </div>
        <div class="flex-1">
          <p class="text-dark-5 fs-14">{{ video.title }}</p>
          <p class="text-gray-2 fs-12">投稿:100 粉丝:200</p>
          <p class="text-gray-2 fs-12">个性签名</p>
        </div>
      </div>
    </div>
    <div class="video-links">
      <div class="d-flex ai-center ml-5 mb-10">
        <span class="icon icon-link mr-5"></span><span>猜您喜欢</span>
      </div>
      <div class="items">
        <ul class="nav nav-links d-flex">
          <li
            class="nav-item mr-5 mb-18"
            v-for="(item, index) in linkItems"
            :key="`link-${index}`"
          >
            <router-link class="nav-link d-flex" :to="`/videos/${item._id}`">
              <img
                class="mb-5"
                v-lazy="item.coverImg"
                data-lazy="true"
                alt=""
              />
              <p class="fs-12 text-ellipsis-2">{{ item.title }}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Video",
  props: {
    id: { type: String },
  },
  data() {
    return {
      video: {
        videoUrl: "",
      },
      linkItems: [],
    };
  },
  methods: {
    async getVideo() {
      const res = await this.$http.get(`/videos/${this.id}`);
      this.video = res.data.video;
      this.linkItems = res.data.linkItems;
    },
  },
  created() {
    this.getVideo();
  },
};
</script>

<style lang="scss">
@import "./../../assets/scss/helper";

.video {
  .video-wrap {
    width: 100%;
    height: 4.2rem;
    video {
      width: 100%;
      height: 100%;
    }
  }

  .video-infor {
    margin: 0.28rem 0.1rem;
    border: 1px solid $border-color;
    .avatar {
      width: 57px;
      height: 1.46rem;
    }
  }
  .video-links {
    .items {
      height: 140px;
      margin: 0 8px 10px 8px;
      overflow-x: scroll;
    }
  }
}

.icon {
  &.icon-link {
    @include bgImg(16px, 24px, "./../../assets/images/videoContHear.png");
  }
}

.nav {
  &.nav-links {
    width: 28.4rem;
    .nav-item {
      width: 2.74rem;
      .nav-link {
        color: #545353;
      }

      img {
        width: 100%;
        height: 1.92rem;
        border-radius: 0.08rem;
      }
    }
  }
}
</style>
