<template>
  <div>
    <el-button
      type="primary"
      size="small"
      @click="$router.push(`/${resource.name}/create`)"
      >创建</el-button
    >
    <h3 class="table-title">{{ this.resource.title }}列表</h3>
    <el-table :data="data" border stripe>
      <el-table-column
        v-for="(field, key) in fields"
        :prop="key"
        :key="key"
        :label="field.label"
        :width="field.width"
      ></el-table-column>
      <el-table-column prop="avatar" label="头像" width>
        <template v-slot="{ row }">
          <img :src="row.avatar" alt="头像" style="height: 2rem" />
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="160">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/${resource.name}/edit/${scope.row._id}`)"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="remove(scope.row._id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="changePageSize"
      @current-change="changeCurrentPage"
      :page-sizes="pagination.pageSizes"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"
    ></el-pagination>
  </div>
</template>

<script>
import {
  fetch,
  remove,
  changePageSize,
  changeCurrentPage,
} from "./../../api/crud";

export default {
  data() {
    return {
      resource: {
        name: "heroes",
        title: "英雄",
      },
      data: [],
      fields: {
        _id: { label: "ID", width: "240" },
        title: { label: "称号", width: "240" },
        name: { label: "用户名", width: "" },
      },
      pagination: {
        total: 0,
        pageSizes: [10, 20, 30, 50, 100],
      },
      query: {
        page: 1,
        limit: 10,
      },
    };
  },

  methods: {
    fetch,
    remove,
    changePageSize,
    changeCurrentPage,
  },

  created() {
    this.fetch();
  },
};
</script>

<style lang="scss" scoped></style>
