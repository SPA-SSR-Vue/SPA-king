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
      <el-form-item label="封面">
        <el-upload
          class="avatar-uploader"
          :headers="getAuthHeaders()"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="res => $set(model, 'coverImg', res.url)"
        >
          <img
            v-if="model.coverImg"
            :src="model.coverImg"
            class="avatar cover"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon cover"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="推荐/热门">
        <el-switch v-model="model.ishot">是否推荐</el-switch>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <vue-editor v-model="model.content"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { save, fetchOne, fetchCats } from "./../../api/crud";

export default {
  props: {
    id: {},
  },
  data() {
    return {
      resource: {
        name: "articles",
        title: "文章",
      },
      model: {
        title: "",
        content: "",
        coverImg: "",
        desc: "",
      },
      categories: [],
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
    fetchCats,
  },

  created() {
    this.id && this.fetchOne();
    this.fetchCats();
  },
};
</script>

<style lang="scss">
.cover {
  width: 400px;
}
</style>
