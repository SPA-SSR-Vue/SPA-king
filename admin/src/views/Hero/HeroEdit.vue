<template>
  <div>
    <h3 class="form-title">
      {{ isNew ? "新建" : "编辑" }}{{ resource.title }}
    </h3>
    <el-form
      :model="model"
      @submit.native.prevent="save"
      ref="form"
      label-width="80px"
    >
      <el-tabs v-model="tab.name" type="card">
        <el-tab-pane label="基础信息" name="1">
          <el-row>
            <el-col :span="12">
              <el-form-item label="所属分类">
                <el-select v-model="model.categories" multiple filterable>
                  <el-option
                    v-for="category in categories"
                    :key="category._id"
                    :label="category.name"
                    :value="category._id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="称号">
                <el-input v-model="model.title" style="width: 80%"></el-input>
              </el-form-item>
              <el-form-item label="名字">
                <el-input v-model="model.name" style="width: 80%"></el-input>
              </el-form-item>
              <el-form-item label="头像">
                <el-upload
                  class="avatar-uploader"
                  :headers="getAuthHeaders()"
                  :action="uploadUrl"
                  :show-file-list="false"
                  :on-success="res => $set(model, 'avatar', res.url)"
                >
                  <img v-if="model.avatar" :src="model.avatar" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="难度">
                <el-rate
                  v-model="model.comment.difficult"
                  :max="10"
                  show-score
                  style="margin-top: 10px"
                ></el-rate>
              </el-form-item>
              <el-form-item label="技能">
                <el-rate
                  v-model="model.comment.skill"
                  :max="10"
                  show-score
                  style="margin-top: 10px"
                ></el-rate>
              </el-form-item>
              <el-form-item label="攻击">
                <el-rate
                  v-model="model.comment.attack"
                  :max="10"
                  show-score
                  style="margin-top: 10px"
                ></el-rate>
              </el-form-item>
              <el-form-item label="生存">
                <el-rate
                  v-model="model.comment.survive"
                  :max="10"
                  show-score
                  style="margin-top: 10px"
                ></el-rate>
              </el-form-item>
              <el-form-item label="顺风出装">
                <el-select v-model="model.items1" multiple filterable>
                  <el-option
                    v-for="item in items"
                    :key="item._id"
                    :label="item.name"
                    :value="item._id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="逆风出装">
                <el-select v-model="model.items2" multiple filterable>
                  <el-option
                    v-for="item in items"
                    :key="item._id"
                    :label="item.name"
                    :value="item._id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="铭文推荐">
                <el-select v-model="model.epigraphs" multiple filterable>
                  <el-option
                    v-for="epigraph in epigraphs"
                    :key="epigraph._id"
                    :label="epigraph.name"
                    :value="epigraph._id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="技能编辑" name="2"></el-tab-pane>
        <el-tab-pane label="英雄相关" name="3">
          <el-form-item label="使用技巧">
            <el-input v-model="model.usageTips" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input v-model="model.fightingTips" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input v-model="model.teamTips" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="最佳搭档">
            <el-button
              type="success"
              size="small"
              @click="model.partners.push({})"
            >
              <i class="el-icon-plus"></i>添加
            </el-button>
            <el-row>
              <el-col
                :span="12"
                v-for="(partner, index) in model.partners"
                :key="index"
              >
                <el-select v-model="partner.hero" filterable>
                  <el-option
                    v-for="hero in heroes"
                    :key="hero._id"
                    :label="hero.name"
                    :value="hero._id"
                  ></el-option>
                </el-select>
                <el-input v-model="partner.desc" type="textarea"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="被谁克制">
            <el-button
              type="success"
              size="small"
              @click="model.controllers.push({})"
            >
              <i class="el-icon-plus"></i>添加
            </el-button>
            <el-row>
              <el-col
                :span="12"
                v-for="(controller, index) in model.controllers"
                :key="index"
              >
                <el-select v-model="controller.hero" filterable>
                  <el-option
                    v-for="hero in heroes"
                    :key="hero._id"
                    :label="hero.name"
                    :value="hero._id"
                  ></el-option>
                </el-select>
                <el-input v-model="controller.desc" type="textarea"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="克制谁">
            <el-button
              type="success"
              size="small"
              @click="model.restrainers.push({})"
            >
              <i class="el-icon-plus"></i>添加
            </el-button>
            <el-row>
              <el-col
                :span="12"
                v-for="(restrainer, index) in model.restrainers"
                :key="index"
              >
                <el-select v-model="restrainer.hero" filterable>
                  <el-option
                    v-for="hero in heroes"
                    :key="hero._id"
                    :label="hero.name"
                    :value="hero._id"
                  ></el-option>
                </el-select>
                <el-input
                  v-model="restrainer.desc"
                  type="textarea"
                ></el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { save, fetchOne } from "./../../api/crud";

export default {
  props: {
    id: {},
  },
  data() {
    return {
      resource: {
        name: "heroes",
        title: "英雄",
      },
      model: {
        name: "",
        avatar: "",
        comment: { difficult: 0 },
        partners: [],
        controllers: [],
        restrainers: [],
      },
      categories: [],
      items: [],
      epigraphs: [],
      heroes: [],
      tab: {
        name: "1",
      },
    };
  },

  computed: {
    isNew() {
      return !this.id;
    },
  },

  methods: {
    save,
    fetchOne,

    async fetchCategories() {
      const res = await this.$http.get("/rest/categories");
      this.categories = res.data;
    },

    async fetchItems() {
      const res = await this.$http.get("/rest/items");
      this.items = res.data;
    },

    async fetchEpigraphs() {
      const res = await this.$http.get("/rest/epigraphs");
      this.epigraphs = res.data;
    },

    async fetchHeroes() {
      const res = await this.$http.get("/rest/heroes");
      this.heroes = res.data;
    },
  },

  created() {
    this.id && this.fetchOne();
    this.fetchCategories();
    this.fetchItems();
    this.fetchEpigraphs();
    this.fetchHeroes();
  },
};
</script>

<style lang="scss" scoped></style>
