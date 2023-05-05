const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/produtoDetalhe",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "prodDet",
        component: () => import("pages/produtoDetalhe.vue"),
      },
    ],
  },
  {
    path: "/carrinho",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "carrCompra",
        component: () => import("pages/carrinhoCompras.vue"),
      },
    ],
  },
  {
    path: "/dadospedido",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "dadosPed",
        component: () => import("pages/dadosPedido.vue"),
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
