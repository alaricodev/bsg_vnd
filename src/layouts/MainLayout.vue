<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Bistrô sem Glúten </q-toolbar-title>
        <q-space />
        <div v-if="store.carrinhoItem">
          <q-btn
            dense
            flat
            icon="shopping_cart"
            :label="`Finalizar ${this.store.carrinho.length} itens`"
          />
        </div>
      </q-toolbar>
    </q-header>
    <q-footer elevated v-if="store.carrinhoItem">
      <q-bar class="bg-primary">
        <q-btn dense flat icon="shopping_cart" label="Finalizar compra" />
        <q-space />
        <q-btn dense flat icon="sell" label="02 itens" />
        <q-btn dense flat icon="attach_money" class="gt-xs" label="R$ 68,00" />
      </q-bar>
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
    const leftDrawerOpen = ref(false);
    const store = useStore();

    return {
      store,
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
