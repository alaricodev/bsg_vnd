<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          color="secondary"
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <q-img
            src="../../public/logo_site_horinzontal.png"
            style="height: 30px; max-width: 180px"
          />
        </q-toolbar-title>
        <!-- <div style="text-align: left; align-items: left">
          <q-btn flat icon="search" />
        </div> -->
      </q-toolbar>
    </q-header>
    <q-footer
      v-if="store.totalItens > 0 && !store.carrinhoAberto"
      clickable
      @click="goCarrinho()"
    >
      <div class="q-ma-sm">
        <q-bar class="bg-primary cursor-pointer">
          <div class="cursor-pointer">
            <div class="row">
              <div class="text-secondary">
                {{ formataItens(store.totalItens) }}
              </div>
            </div>
          </div>
          <q-space />
          <div class="cursor-pointer">
            <div class="row">
              <div class="">CARRINHO</div>
            </div>
          </div>
          <q-space />
          <div class="cursor-pointer">
            <div class="row">
              <div class="text-secondary">
                {{ forCurr.format(store.totalCarrinho) }}
              </div>
            </div>
          </div>

          <!-- <q-btn flat icon="shopping_cart" label="Finalizar compra" />
        <q-space />
        <q-btn flat icon="sell" :label="" />
        <q-btn
          flat
          icon="attach_money"
          class="gt-xs"
          :label="forCurr.format(store.totalCarrinho)"
        /> -->
        </q-bar>
      </div>
    </q-footer>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <menu-lateral />
      <q-list>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
        <!-- <q-item-label header class="text-primary text-bold text-overline">
          CATEGORIAS
        </q-item-label> -->
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useStore } from "../stores/store";
import MenuLateral from "src/components/menuLateral.vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
    MenuLateral,
  },

  setup() {
    const leftDrawerOpen = ref(true);
    const store = useStore();
    const forCurr = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    const linksList = [
      {
        title: "Cardápio online",
        caption: "Compre por aqui mesmo e receba em casa",
        icon: "fa-solid fa-dumpster",
        link: "/",
        tipoLink: "rota",
      },
      {
        title: "Venha para nossa loja",
        caption: "Clique aqui e abra uma rota no google maps",
        icon: "fa-solid fa-location-dot",
        link: "https://www.google.com/maps/dir/?api=1&destination=-27.58569244273288, -48.58341109288488",
        tipoLink: "externo",
      },

      // {
      //   title: "Onde Estamos",
      //   caption: "Conheça nossa loja no estreiro",
      //   icon: "fa-regular fa-map",
      //   link: "/landingpage/loc",
      //   tipoLink: "rota",
      // },
      {
        title: "Whatsapp",
        caption: "Tire as duas duvidas com a gente",
        icon: "fa-brands fa-whatsapp",
        link: `https://wa.me/55${store.telefoneWhatsApp}`,
        tipoLink: "externo",
      },
      {
        title: "Instagram",
        caption: "Fique por dentro de todas nossas novidades",
        icon: "fa-brands fa-instagram",
        link: "https://www.instagram.com/bistrosemgluten/",
        tipoLink: "externo",
      },
      {
        title: "Quem somos",
        caption: "Conheça um pouco sobre a gente e a nossa localização",
        icon: "fa-solid fa-shop",
        link: "/landingpage",
        tipoLink: "rota",
      },
    ];

    function formataItens(valor) {
      if (valor == 1) {
        return `0${valor} ITEM`;
      } else {
        if (valor > 10) {
          return `${valor} ITENS`;
        } else {
          return `0${valor} ITENS`;
        }
      }
    }

    return {
      formataItens,
      forCurr,
      store,
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  mounted() {
    this.leftDrawerOpen = false;
    this.store.carrinho = this.store.carregarLs(this.store.lsCarrinhoKey);
  },

  methods: {
    goCarrinho() {
      this.$router.push("/carrinho");
    },
  },
});
</script>
