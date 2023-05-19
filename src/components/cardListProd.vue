<template>
  <div
    class="q-pa-sm"
    style="max-width: 450px"
    v-for="produto in produtos"
    :key="produto.id"
  >
    <div :class="store.isMobile ? 'div01-mob' : 'div01'">
      <div
        class="div02 cursor-pointer"
        clickable
        @click="abrirDetalhe(produto.id)"
      >
        <q-img
          :src="srcImg(produto.foto)"
          spinner-color="white"
          style="height: 130px; max-width: 130px; border-radius: 5px"
        />
      </div>
      <div style="flex: 1">
        <q-item clickable @click="abrirDetalhe(produto.id)">
          <q-item-section>
            <q-item-label class="text-subtitle1 text-bold q-mb-sm">
              {{ produto.nome }}
            </q-item-label>
            <q-item-label caption>
              {{ produto.descricao }}
            </q-item-label>
            <q-item-label class="text-h6 text-primary q-mt-md">
              R$ {{ produto.preco }}
              <q-badge outline color="primary" :label="produto.peso" />
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "../stores/store.js";
export default {
  name: "cardListProd",
  props: {
    categoria: {
      required: true,
    },
  },
  setup() {
    const store = useStore();
    return {
      store,
      produtos: ref([]),
    };
  },
  mounted() {
    this.produtos = this.store.produtos.filter((item) => {
      return item.categoria == this.categoria;
    });
  },

  methods: {
    srcImg(foto) {
      return `fotos/${foto}`;
    },
    abrirDetalhe(id) {
      //this.store.selecionaProduto(id);
      this.$router.push(`/produtoDetalhe/${id}`);
    },
  },
};
</script>
<style>
.div01 {
  display: flex;
  align-items: center;
  border: 1px solid #edebeb;
  border-radius: 5px;
  padding: 10px;
}
.div01-mob {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #edebeb;
  padding: 10px;
}
.div02 {
  flex: 0 0 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  overflow: hidden;
}
</style>
