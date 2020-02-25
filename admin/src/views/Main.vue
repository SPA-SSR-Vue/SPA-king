<template>
  <el-container>
    <el-aside width="180px">
      <el-menu router :default-active="$route.path" style="height: 100vh">
        <el-submenu v-for="(item, index) in menu.items" :index="`${index} + 1`" :key="index">
          <template slot="title">{{item.title}}</template>
          <el-menu-item-group
            v-for="(groupItem, groupItemIndex) in item.groupItems"
            :key="groupItemIndex"
          >
            <template slot="title">{{groupItem.title}}</template>
            <el-menu-item
              :index="subItem.path"
              v-for="(subItem, subItemIndex) in groupItem.items"
              :key="subItemIndex"
            >{{subItem.name}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <router-link to="/">
          <h2>{{resource.title}}</h2>
        </router-link>
        <el-button class="btn" type="primary" size="small" @click="logout">退出</el-button>
      </el-header>
      <el-main>
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "ViewMain",
  data() {
    return {
      resource: {
        name: "main",
        title: "王者荣耀网站后台管理系统"
      },
      menu: {
        items: [
          {
            title: "内容管理",
            groupItems: [
              {
                title: "分类",
                items: [
                  { name: "新建分类", path: "/categories/create" },
                  { name: "分类列表", path: "/categories/list" }
                ]
              },
              {
                title: "文章",
                items: [
                  { name: "新建文章", path: "/articles/create" },
                  { name: "文章列表", path: "/articles/list" }
                ]
              },
              {
                title: "英雄",
                items: [
                  { name: "新建英雄", path: "/heroes/create" },
                  { name: "英雄列表", path: "/heroes/list" }
                ]
              },
              {
                title: "技能",
                items: [
                  { name: "新建技能", path: "/skills/create" },
                  { name: "技能列表", path: "/skills/list" }
                ]
              },
              {
                title: "物品",
                items: [
                  { name: "新建物品", path: "/items/create" },
                  { name: "物品列表", path: "/items/list" }
                ]
              },
              {
                title: "铭文",
                items: [
                  { name: "新建铭文", path: "/epigraphs/create" },
                  { name: "铭文列表", path: "/epigraphs/list" }
                ]
              },
              {
                title: "banner",
                items: [
                  { name: "新建banner", path: "/banners/create" },
                  { name: "banner列表", path: "/banners/list" }
                ]
              }
            ]
          },
          {
            title: "账户管理",
            groupItems: [
              {
                title: "管理员账户",
                items: [
                  { name: "新建管理员账户", path: "/admin_users/create" },
                  { name: "管理员账户列表", path: "/admin_users/list" }
                ]
              }
            ]
          }
        ]
      }
    };
  },

  methods: {
    logout() {
      localStorage.removeItem("king-token");
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  height: 60px !important;
  border-bottom: 1px solid #ddd;
  h2 {
    margin-top: 10px;
  }
  button {
    position: absolute;
    right: 80px;
    top: 10px;
  }
}
</style>