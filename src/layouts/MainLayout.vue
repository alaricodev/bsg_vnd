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
        <div style="text-align: left; align-items: left">
          <q-btn flat icon="search" />
        </div>
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
      <q-list>
        <q-item-label header class="text-primary text-bold text-overline">
          CATEGORIAS
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
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

const linksList = [
  {
    title: "Pães",
    caption: "Deliciosos pães sem glúten",
    icon: "breakfest_dining",
    link: "",
  },
  {
    title: "Bolos",
    caption: "Pode ser gostoso e saudável",
    icon: "cake",
    link: "",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(true);
    const store = useStore();
    const forCurr = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
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
  },

  methods: {
    goCarrinho() {
      this.$router.push("/carrinho");
    },
  },
});
</script>
