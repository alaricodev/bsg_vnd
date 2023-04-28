<template>
  <q-page class="flex flex-center">
    <!-- <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    > -->
    <card-produto
      v-for="(produto, index) in produtos"
      :key="index"
      :dados="produto"
    />
  </q-page>
</template>

<script>
import cardProduto from "src/components/cardProduto.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: { cardProduto },
  name: "IndexPage",
  setup() {
    return {
      produtos: ref([
        {
          foto: "https://cdn.quasar.dev/img/chicken-salad.jpg",
          nome: "Pão de Abóbora",
          preco: "26,90",
          peso: "900g",
          descricao:
            "Pão de abóbora sem glúten é um delicioso pão feito com farinha sem glúten e purê de abóbora. É macio, úmido e rico em sabor de abóbora, e é perfeito para quem busca uma opção sem glúten.",
        },
        {
          foto: "https://cdn.quasar.dev/img/chicken-salad.jpg",
          nome: "Pão de Ervas finas e tomate seco",
          preco: "32,90",
          peso: "900g",
          descricao:
            "O pão de ervas finas com tomate seco é um pão saboroso e aromático, que combina ervas e tomate seco. É macio por dentro e crocante por fora, e pode ser apreciado como lanche ou acompanhamento em refeições. Ideal para quem busca sabores mais complexos.",
        },
      ]),
    };
  },
});
</script>
