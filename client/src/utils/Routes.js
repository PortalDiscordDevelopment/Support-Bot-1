// simple paths
export const PATH_AUTH = "/";
export const PATH_DASHBOARD = "/";

// param paths
export const PATH_WITH_PARAMS = (id?: string) => `/path-with-params/${id ? id : ":id"}`;
