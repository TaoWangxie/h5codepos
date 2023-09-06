import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory("/nuwa/"), // hash模式:createWebHashHistory，history模式:createWebHistory
  routes: [
    {
      path: "/",
      redirect: "/editor",
    },
    {
      path: "/editor",
      name: "editor",
      component: () =>
        import(/* webpackChunkName: "editor" */ "@/views/editor/index.vue"),
        meta: {
          index: 0,
        },
    },
    {
      path: "/preview",
      name: "preview",
      component: () =>
        import(/* webpackChunkName: "editor" */ "@/views/preview/index.vue"),
      meta: {
        index: 1,
      },
    },
    {
      path: "/demo",
      name: "demo",
      component: () =>
        import(/* webpackChunkName: "editor" */ "@/views/demo/index2.vue"),
      meta: {
        index: 1,
      },
    },
    {
      path: "/test",
      name: "test",
      component: () =>
        import(/* webpackChunkName: "editor" */ "@/views/test/index.vue"),
      meta: {
        index: 1,
      },
    },
  ],
});

export default router;
