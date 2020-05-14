import req from "./../plugins/axios";

export function getBanner(query) {
  return req.get("/banners", {
    params: query,
  });
}
