<template>
  <div class="q-pa-md" style="max-width: 450px">
    <div
      style="
        display: flex;
        align-items: center;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px;
      "
    >
      <div
        style="
          flex: 0 0 140px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 5px;
          overflow: hidden;
        "
      >
        <q-img
          :src="srcImg"
          spinner-color="white"
          style="height: 130px; max-width: 130px"
        />
      </div>
      <div style="flex: 1">
        <q-item clickable @click="abrirDetalhe(dados.id)">
          <q-item-section>
            <q-item-label>{{ dados.nome }}</q-item-label>
            <q-item-label caption>
              {{ dados.descricao }}
            </q-item-label>
            <q-item-label>
              R$ {{ dados.preco }} - {{ dados.peso }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "../stores/store.js";
export default {
  name: "cardListProd",
  props: {
    dados: {
      required: true,
    },
  },
  setup() {
    const store = useStore();
    return { store };
  },
  computed: {
    srcImg() {
      return "fotos/" + this.dados.foto;
    },
  },
  methods: {
    abrirDetalhe(id) {
      this.store.selecionaProduto(id);
      this.$router.push("/produtoDetalhe");
    },
  },
};
</script>
