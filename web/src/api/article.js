import req from "./../plugins/axios";

export function getArticles(query) {
  return req.get("/articles", {
    params: query,
  });
}
