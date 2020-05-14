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
        <el-select v-model="model.categories" multiple filter>
          <el-option
            v-for="category in categories"
            :key="category._id"
            :label="category.name"
            :value="category._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="items">
        <el-button type="success" size="small" @click="model.items.push({})">
          <i class="el-icon-plus"></i> 添加
        </el-button>
        <el-row>
          <el-col :span="12" v-for="(item, index) in model.items" :key="index">
            <el-form-item label="title" label-width="80px">
              <el-input v-model="item.title"></el-input>
            </el-form-item>
            <el-form-item label="targetUrl" label-width="80px">
              <el-input v-model="item.targetUrl"></el-input>
            </el-form-item>
            <el-form-item label="imgUrl">
              <el-upload
                class="avatar-uploader"
                :headers="getAuthHeaders()"
                :action="uploadUrl"
                :show-file-list="false"
                :on-success="res => $set(item, 'coverImg', res.url)"
              >
                <img
                  v-if="item.coverImg"
                  :src="item.coverImg"
                  class="avatar"
                  style="width: 100%"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
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
        name: "banners",
        title: "横幅",
      },
      model: {
        categories: [],
        name: "",
        items: [{}],
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
