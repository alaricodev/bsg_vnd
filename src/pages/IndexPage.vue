<template>
  <div class="q-pa-sm text-subtitle1">DESTAQUES</div>
  <carrossel-destaque />
  <btnFiltro />
  <q-page>
    <div v-for="cat in store.categorias" :key="cat">
      <div class="q-pa-sm text-subtitle1 text-uppercase" :id="`id${cat}`">
        {{ cat }}
        <q-separator />
      </div>
      <div class="flex flex-center">
        <card-list-prod :categoria="cat" />
      </div>
    </div>
  </q-page>
  <divisorTela height="1rem" />
</template>

<script>
import CardListProd from "src/components/cardListProd.vue";
import divisorTela from "src/components/divisorTela.vue";
import btnFiltro from "src/components/btnFiltro.vue";
import { defineComponent, ref } from "vue";
import { useStore } from "../stores/store.js";
import CarrosselDestaque from "src/components/carrosselDestaque.vue";

export default defineComponent({
  components: { CardListProd, btnFiltro, CarrosselDestaque, divisorTela },
  name: "IndexPage",
  setup() {
    const store = useStore();
    return {
      store,
      slide: ref(1),
      arrayCategoria: ref([]),
    };
  },
  mounted() {
    this.store.filtroSelecionado = true;

    this.arrayCategoria = this.store.produtos
      .map((p) => p.categoria)
      .filter((c, i, arr) => arr.indexOf(c) === i);
  },
  beforeUnmount() {
    this.store.filtroSelecionado = false;
  },
  methods: {},
});
</script>
