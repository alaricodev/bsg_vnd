<template>
  <q-list>
    <q-item v-for="item in regioes" :key="item.id" tag="label" v-ripple>
      <q-item-section avatar>
        <q-radio v-model="escolhaFrete" :val="`${item.id};${item.valor}`" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{
          `${item.regiao} - ${forCurr.format(item.valor)}`
        }}</q-item-label>
        <q-item-label caption>{{ item.bairros.join(", ") }} </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import regioes from "../assets/data/regioes.json";
import { ref } from "vue";
import { useStore } from "../stores/store.js";
export default {
  setup() {
    const forCurr = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    const store = useStore();
    return {
      store,
      forCurr,
      regioes,
      escolhaFrete: ref(null),
    };
  },
  watch: {
    escolhaFrete() {
      this.store.mudaOpcaoFrete(parseFloat(this.escolhaFrete.split(";")[1]));
    },
  },
};
</script>
