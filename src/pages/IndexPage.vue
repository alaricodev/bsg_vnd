<template>
  <div class="q-pa-sm text-subtitle1 text-bold text-center">
    D E S T A Q U E S
  </div>

  <carrossel-destaque />
  <btnFiltro />
  <q-page>
    <div v-for="cat in store.categorias" :key="cat">
      <!-- <div
        class="q-px-md bg-grey-2 text-subtitle1 text-bold text-uppercase"
        :id="`id${cat}`"
        style="width: 100%"
      >
        <div class="row">{{ cat }}</div>
      </div>

      <div class="flex flex-center">
        <card-list-prod :categoria="cat" />
      </div> -->
      <q-expansion-item
        dense
        dense-toggle
        expand-separator
        header-class="text-subtitle1 bg-grey-2 text-bold text-uppercase"
        :label="cat"
        default-opened
        :id="`id${cat}`"
      >
        <div class="flex flex-center">
          <card-list-prod :categoria="cat" />
        </div>
      </q-expansion-item>
    </div>
  </q-page>
  <divisorTela height="1rem" />
  <botao-fluante />
</template>

<script>
import CardListProd from "src/components/cardListProd.vue";
import divisorTela from "src/components/divisorTela.vue";
import btnFiltro from "src/components/btnFiltro.vue";
import { defineComponent, ref } from "vue";
import { useStore } from "../stores/store.js";
import CarrosselDestaque from "src/components/carrosselDestaque.vue";
import BotaoFluante from "src/components/BotaoFluante.vue";

export default defineComponent({
  components: {
    CardListProd,
    btnFiltro,
    CarrosselDestaque,
    divisorTela,
    BotaoFluante,
  },
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
