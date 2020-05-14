import req from "./../plugins/axios";

export function getResources(name, query = {}) {
  return req.get(`/rest/${name}`, {
    params: query,
  });
}

export function getResource(name, id, query = {}) {
  return req.get(`/rest/${name}/${id}`);
}

export function postResource(name, body = {}) {
  return req.post(`/rest/${name}`, body);
}

export function putResource(name, id, body = {}) {
  return req.put(`/rest/${name}/${id}`, body);
}

export function deleteResource(name, id) {
  return req.delete(`/rest/${name}/${id}`);
}

export async function save() {
  const method = this.isNew ? "POST" : "PUT";
  const url = this.isNew
    ? `/rest/${this.resource.name}`
    : `/rest/${this.resource.name}/${this.id}`;
  await this.$http({
    method,
    url,
    data: this.model,
  });
  this.$router.push(`/${this.resource.name}/list`);
}

export async function fetchOne() {
  const res = await this.$http.get(`/rest/${this.resource.name}/${this.id}`);
  this.model = Object.assign({}, this.model, res.data);
}

export async function fetch() {
  const res = await this.$http.get(`/rest/${this.resource.name}`, {
    params: {
      query: this.query || {},
    },
  });
  this.pagination.total = res.total;
  this.data = res.data;
}

export async function remove(id) {
  this.$confirm(`此操作将永久删除${this.resource.title}, 是否继续?`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      await this.$http.delete(`/rest/${this.resource.name}/${id}`);
      this.fetch();
      this.$message({
        type: "success",
        message: "删除成功!",
      });
    })
    .catch(() => {
      this.$message({
        type: "info",
        message: "已取消删除",
      });
    });
}

export async function fetchCats() {
  const res = await this.$http.get("/rest/categories");
  this.categories = res.data;
}

export function changePageSize(pageSize) {
  this.query.limit = pageSize;
  this.fetch();
}

export function changeCurrentPage(currentPage) {
  this.query.page = currentPage;
  this.fetch();
}
