<template>
  <div>
    <h3 class="form-title">{{this.isNew?'新建':'编辑'}}{{resource.title}}</h3>
    <el-form :model="model" @submit.native.prevent="save" ref="form" label-width="80px">
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
export default {
  props: {
    id: {}
  },
  data() {
    return {
      resource: {
        name: "items",
        title: "物品"
      },
      model: {
        name: "",
        icon: ""
      },
      categories: []
    };
  },

  computed: {
    isNew() {
      return this.id ? false : true;
    }
  },

  methods: {
    async save() {
      const method = this.isNew ? "POST" : "PUT";
      const url = this.isNew
        ? `/rest/${this.resource.name}`
        : `/rest/${this.resource.name}/${this.id}`;
      await this.$http({
        method,
        url,
        data: this.model
      });
      this.$router.push(`/${this.resource.name}/list`);
    },

    async fetchOne() {
      const res = await this.$http.get(
        `/rest/${this.resource.name}/${this.id}`
      );
      this.model = res.data.data;
    },

    async fetchCategories() {
      const res = await this.$http.get("/rest/categories");
      this.categories = res.data.data;
    }
  },

  created() {
    this.id && this.fetchOne();
    this.fetchCategories();
  }
};
</script>

<style lang="scss" scoped>
</style>