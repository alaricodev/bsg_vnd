<template>
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-fab icon="fa-brands fa-whatsapp" direction="up" color="green">
      <q-fab-action
        @click="abrirLinkExterno('whatsapp')"
        color="green"
        icon="fa-brands fa-whatsapp"
      />
      <q-fab-action
        @click="abrirLinkExterno('instagram')"
        color="pink"
        icon="fa-brands fa-instagram"
      />
    </q-fab>
  </q-page-sticky>
</template>

<script>
import { useStore } from "src/stores/store";
export default {
  name: "botaoFlutuante",
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
  methods: {
    abrirLinkExterno(tipo) {
      if (tipo.toUpperCase() == "WHATSAPP") {
        window.open(`https://wa.me/55${this.store.telefoneWhatsApp}`, "_blank");
      } else if (tipo.toUpperCase() == "INSTAGRAM") {
        window.open(`https://www.instagram.com/bistrosemgluten/`, "_blank");
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
