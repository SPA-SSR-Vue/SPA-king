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
      <el-form-item label="上级分类">
        <el-select v-model="model.parent" filterable>
          <el-option
            v-for="category in categories"
            :key="category._id"
            :label="category.name"
            :value="category._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="分类编码">
        <el-input v-model="model.code" type="number"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" size="medium"
          >保存</el-button
        >
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
        name: "categories",
        title: "分类",
      },
      model: {
        name: "",
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
