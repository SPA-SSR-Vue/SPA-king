<template>
  <div v-if="hero.coverImg" class="page-hero">
    <!-- hero header -->
    <div class="hero-hd fixed d-flex ai-center text-white bg-black px-15">
      <router-link to="/" class="sprite sprite-logo"></router-link>
      <span class="mx-10 fs-13">王者荣耀</span>
      <span class="flex-1 ml-5 fs-13">攻略站</span>
      <span>更多英雄</span><span class="ml-10">></span>
    </div>
    <!-- end of hero header -->

    <!-- hero info -->
    <div class="hero-info">
      <div
        class="cover"
        :style="{ 'background-image': `url(${hero.coverImg})` }"
      >
        <div class="info text-white p-15 d-flex flex-column jc-end">
          <div class="fs-11">{{ hero.title }}</div>
          <div class="fs-17 fw-700">{{ hero.name }}</div>
          <div class="fs-11">{{ hero.categories[0].name }}</div>
          <div class="d-flex ai-center">
            <div class="comments flex-1 fs-12 d-flex ai-center">
              <span>难度</span
              ><span class="difficult">{{ hero.comment.difficult }}</span>
              <span>技能</span
              ><span class="skill">{{ hero.comment.skill }}</span>
              <span>攻击</span
              ><span class="attack">{{ hero.comment.attack }}</span>
              <span>生存</span
              ><span class="survive">{{ hero.comment.survive }}</span>
            </div>
            <div class="text-gray-1 fs-11">皮肤：6 ></div>
          </div>
        </div>
      </div>
    </div>
    <!-- end of hero info -->

    <!-- start of hero content -->
    <div class="hero-content">
      <div class="bg-white">
        <ul
          class="nav  d-flex jc-around ai-center pt-12 pb-7 mx-10 bg-white bb-1"
        >
          <li @click="slideTo(0)" class="nav-item" :class="{ active: i === 0 }">
            <span class="nav-link fs-13">英雄初识</span>
          </li>
          <li @click="slideTo(1)" class="nav-item" :class="{ active: i === 1 }">
            <span class="nav-link fs-13">进阶攻略</span>
          </li>
        </ul>
      </div>

      <swiper ref="swp">
        <swiper-slide>
          <div class="d-flex jc-around p-10 bg-white">
            <div class="d-flex ai-center jc-center btn btn-hero">
              <span class="icon icon-p mr-10"></span><span>英雄介绍视频</span>
            </div>
            <div class="d-flex ai-center jc-center btn btn-hero">
              <span class="icon icon-i mr-10"></span><span>一图识英雄</span>
            </div>
          </div>

          <!-- skills -->
          <div class="skills px-10 pt-20 bg-white">
            <div class="skills-item d-flex jc-between ai-center">
              <div
                @click="currentSkillIndex = index"
                v-for="(skill, index) in hero.skills"
                :key="index"
              >
                <img
                  :src="skill.icon"
                  alt=""
                  :class="{ active: currentSkillIndex === index }"
                />
              </div>
            </div>
            <div class="skills-desc mt-20">
              <div>
                <span class="fs-15 fw-600">{{ currentSkill.name }}</span
                ><span class="ml-20"
                  >(冷却值：{{ currentSkill.coolDown }} 消耗：{{
                    currentSkill.expend
                  }})</span
                >
              </div>
              <div class="py-10 fs-13 text-dark-3">{{ currentSkill.desc }}</div>
            </div>
          </div>
          <!-- end of skills -->

          <!-- skill suggustion -->
          <view-card
            simple
            icon1="sug"
            title="加点建议"
            style="margin-bottom:0;border-bottom:0"
          >
            <div slot="body" class="d-flex sug text-center pt-5">
              <div class="sug-item">
                <div class="fs-15">主升</div>
                <img :src="hero.skillSug.major.icon" alt="" width="65" />
                <div class="name">{{ hero.skillSug.major.name }}</div>
              </div>
              <div class="flex-1 sug-item">
                <div class="fs-15">副升</div>
                <img :src="hero.skillSug.minor.icon" alt="" width="65" />
                <div class="name">{{ hero.skillSug.minor.name }}</div>
              </div>
              <div>
                <div class="fs-15">召唤师技能</div>
                <div class="d-flex">
                  <div
                    v-for="(s, index) in hero.skillSug.summoners"
                    :key="`s-${index}`"
                    class="sug-item"
                  >
                    <img :src="s.icon" alt="" width="65" class="mr-7" />
                    <div class="name">{{ s.name }}</div>
                  </div>
                </div>
              </div>
            </div>
          </view-card>
          <!-- end of skill suggustion -->

          <!-- item suggustion -->
          <view-card simple icon1="item" title="出装推荐" style="margin-top:0">
            <div slot="body">
              <div class="bb-1">
                <div class="fs-15 py-5">顺风出装</div>
                <div class="d-flex jc-around text-center">
                  <div
                    v-for="(item, index) in hero.items1"
                    :key="index"
                    class="item-item"
                  >
                    <img :src="item.icon" alt="" />
                    <div class="fs-9 mt-5">{{ item.name }}</div>
                  </div>
                </div>
              </div>
              <div>
                <div class="fs-15 py-5">逆风出装</div>
                <div class="d-flex jc-around text-center">
                  <div
                    v-for="(item, index) in hero.items2"
                    :key="index"
                    class="item-item"
                  >
                    <img :src="item.icon" alt="" />
                    <div class="fs-9 mt-5">{{ item.name }}</div>
                  </div>
                </div>
              </div>
            </div>
          </view-card>
          <!-- end of item suggustion -->

          <!-- usage -->
          <view-card simple icon1="usage" title="使用技巧">
            <div slot="body" class="mt-7">
              {{ hero.usageTips }}
            </div>
          </view-card>
          <!-- end of usage -->

          <!-- fighting -->
          <view-card simple icon1="fighting" title="对抗技巧">
            <div slot="body" class="mt-7">
              {{ hero.fightingTips }}
            </div>
          </view-card>
          <!-- end of fighting -->

          <!-- teamtips -->
          <view-card simple icon1="teamtips" title="团战思路">
            <div slot="body" class="mt-7">
              {{ hero.teamTips }}
            </div>
          </view-card>
          <!-- end of teamtips -->

          <!-- hero relationship -->
          <view-card simple icon1="rela" title="英雄关系">
            <div slot="body">
              <div class="bb-1">
                <div class="fs-15 py-7">最佳搭档</div>
                <div
                  v-for="(partner, index) in hero.partners"
                  :key="`partner-${index}`"
                  class="d-flex hero-item"
                >
                  <img :src="partner.hero.avatar" alt="" />
                  <p>{{ partner.desc }}</p>
                </div>
              </div>
              <div>
                <div class="fs-15 py-7">被谁克制</div>
                <div
                  v-for="(controller, index) in hero.controllers"
                  :key="`controller-${index}`"
                  class="d-flex hero-item"
                >
                  <img :src="controller.hero.avatar" alt="" />
                  <p>{{ controller.desc }}</p>
                </div>
              </div>
              <div class="bb-1">
                <div class="fs-15 py-7">克制谁</div>
                <div
                  v-for="(restrainer, index) in hero.restrainers"
                  :key="`restrainer-${index}`"
                  class="d-flex hero-item"
                >
                  <img :src="restrainer.hero.avatar" alt="" />
                  <p>{{ restrainer.desc }}</p>
                </div>
              </div>
            </div>
          </view-card>
          <!-- end of hero relationship -->
        </swiper-slide>
        <swiper-slide>进阶攻略</swiper-slide>
      </swiper>
    </div>
    <!-- end of hero content -->
  </div>
</template>

<script>
export default {
  name: "Hero",
  props: {
    id: { type: String },
  },
  data() {
    return {
      i: 0,
      currentSkillIndex: 0,
      hero: {
        name: "",
        categories: [{ name: "" }],
        skills: [],
        skillSug: {
          major: {},
        },
        items1: [],
        items2: [],
        comment: {
          difficult: "",
          skill: "",
          attack: "",
          survive: "",
        },
      },
    };
  },
  computed: {
    currentSkill() {
      return this.hero.skills[this.currentSkillIndex];
    },
    swiper() {
      return this.$refs.swp.swiper;
    },
  },
  methods: {
    async getHero() {
      const res = await this.$http.get(`/heroes/${this.id}`);
      this.hero = res.data;
    },

    slideTo(i) {
      this.swiper.slideTo(i);
      this.i = this.swiper.activeIndex;
    },
  },
  created() {
    this.getHero();
  },
};
</script>

<style lang="scss">
@import "./../../assets/scss/helper";

.page-hero {
  .hero-hd {
    width: 100%;
    height: 44px;
  }

  .hero-info {
    margin-top: 44px;
    position: relative;
    .cover {
      width: 100%;
      height: 3.82rem;
      background-repeat: no-repeat;
      background-position: top center;
      background-size: 100% 100%;
    }

    .info {
      width: 100%;
      height: 100%;
      background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));

      .difficult,
      .skill,
      .attack,
      .survive {
        display: inline-block;
        text-align: center;
        font-size: 0.16rem;
        width: 12px;
        height: 12px;
        line-height: 13px;
        border-radius: 50%;
        margin: 0 6px;
      }

      .difficult {
        background-color: #805300;
      }

      .skill {
        background-color: #1f3696;
      }

      .attack {
        background-color: #791a16;
      }

      .survive {
        background-color: #33332c;
      }
    }
  }

  .hero-content {
    .sug-item {
      .name {
        font-size: 0.18rem;
        margin-top: 0.14rem;
      }
      img {
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
        margin-top: 10px;
      }
    }
    .item-item {
      img {
        width: 0.93rem;
        height: 0.93rem;
        border-radius: 0.46rem;
      }
    }

    .hero-item {
      justify-content: center;
      margin-bottom: 15px;
      img {
        width: 0.96rem;
        height: 0.96rem;
        margin-right: 0.2rem;
      }
    }
  }

  .skills {
    .skills-item {
      img {
        width: 65px;
        height: 65px;
        margin: 0 10px;
        border: 0.06rem solid white;
        border-radius: 0.58rem;
        &.active {
          border-color: map-get($colors, primary);
        }
      }
    }
  }

  .card {
    .card-header {
      .card-header-inner {
        padding-bottom: 5px;
      }
      .title {
        font-weight: 600;
      }
    }

    .card-body {
      font-size: 13px;
      color: map-get($colors, dark-3);
      padding-bottom: 0.2rem;
    }
  }
}

.nav {
  &.nav-hero-d {
    border-bottom: 1px solid gray;
    .nav-item {
      color: map-get($colors, primary);
    }
  }
}

.icon {
  &.icon-p {
    @include bgImg(20px, 20px, "./../../assets/images/icon_06.png");
  }

  &.icon-i {
    @include bgImg(20px, 20px, "./../../assets/images/icon_07.png");
  }
}

.sprite {
  &.sprite-sug {
    @include bgImg(13px, 13px, "./../../assets/images/icon_16.png");
  }
  &.sprite-item {
    @include bgImg(13px, 13px, "./../../assets/images/icon_11.png");
  }
  &.sprite-usage {
    @include bgImg(13px, 13px, "./../../assets/images/icon_13.png");
  }
  &.sprite-fighting {
    @include bgImg(13px, 13px, "./../../assets/images/icon_14.png");
  }
  &.sprite-teamtips {
    @include bgImg(13px, 13px, "./../../assets/images/icon_15.png");
  }
  &.sprite-rela {
    @include bgImg(13px, 13px, "./../../assets/images/icon_08.png");
  }
}

.btn {
  &.btn-hero {
    width: 172px;
    height: 37px;
    line-height: 37px;
    background-color: #fcfcfc;
    border: 1px solid $border-color;
  }
}
</style>
