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
      <el-row>
        <el-col :span="12">
          <el-form-item label="所属英雄">
            <el-select v-model="model.hero" filterable>
              <el-option
                v-for="hero in heroes"
                :key="hero._id"
                :label="hero.name"
                :value="hero._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="图标">
            <el-upload
              class="avatar-uploader"
              :headers="getAuthHeaders()"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="res => $set(model, 'icon', res.url)"
            >
              <img v-if="model.icon" :src="model.icon" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="12"
          ><el-form-item label="名字">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="冷却值">
            <el-input v-model="model.coolDown"></el-input>
          </el-form-item>
          <el-form-item label="消耗值">
            <el-input v-model="model.expend"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="model.desc" type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

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
        name: "skills",
        title: "技能",
      },
      model: {
        name: "",
        icon: "",
      },
      heroes: [],
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
    async fetchHero() {
      const res = await this.$http.get("/rest/heroes");
      this.heroes = res.data;
    },
  },

  created() {
    this.id && this.fetchOne();
    this.fetchHero();
  },
};
</script>

<style lang="scss" scoped></style>
