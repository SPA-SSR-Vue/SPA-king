import req from "./../plugins/axios";

export * from "./banner";
export * from "./article";

export function getResources(name, query) {
  return req.get(`/${name}`, {
    params: query,
  });
}

