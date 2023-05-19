<template>
  <div class="scroll-container q-pa-sm">
    <div class="scroll-content">
      <q-chip
        v-for="item in filtro"
        :key="item"
        outline
        color="primary"
        text-color="primary"
        clickable
        @click="selecionaItem(item)"
      >
        {{ item }}
      </q-chip>
      <!-- <q-badge
        outline
        v-for="item in filtro"
        :key="item"
        class="q-mx-sm cursor-pointer"
        color="primary"
        :label="item"
        @click="selecionaItem(item)"
      /> -->
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "../stores/store";

export default {
  name: "btnFiltro",
  props: ["texto"],
  setup() {
    const store = useStore();
    return {
      store,
      filtro: ref([]),
      topoTela: ref(false),
    };
  },
  mounted() {
    this.filtro = this.store.categorias;
  },

  methods: {
    mudaSelecao(nome) {
      this.store.filtroSelecionado === nome
        ? (this.store.filtroSelecionado = "")
        : (this.store.filtroSelecionado = nome);
    },
    selecionaItem(nome) {
      const element = document.getElementById(`id${nome}`);
      element.scrollIntoView({ behavior: "smooth" });
    },
  },
};
</script>
<style>
div.scrollmenu {
  width: auto;
  height: auto;
  overflow-x: overlay;
  overflow-y: hidden;
  white-space: nowrap;
  scrollbar-width: none;
}
.scrollmenu::-webkit-scrollbar {
  display: none;
}

.scroll-container {
  width: 100%;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  white-space: nowrap;
  scrollbar-width: none;
}

.scroll-content {
  display: inline-block;
  scroll-snap-align: start;
}
</style>
