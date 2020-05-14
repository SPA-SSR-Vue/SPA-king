<template>
  <div>
    <h3 class="form-title">
      {{ this.isNew ? "新建" : "编辑" }}{{ resource.title }}
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
      <el-form-item label="名字">
        <el-input v-model="model.name"></el-input>
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
        name: "epigraphs",
        title: "铭文",
      },
      model: {
        name: "",
        icon: "",
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

<style></style>
