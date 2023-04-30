<template>
  <q-page class="flex flex-center">
    <!-- <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    > -->

    <card-list-prod
      v-for="produto in store.produtos"
      :key="produto.id"
      :dados="produto"
    />
  </q-page>
</template>

<script>
import CardListProd from "src/components/cardListProd.vue";
// import cardProduto from "src/components/cardProduto.vue";
import { defineComponent, ref } from "vue";
import { useStore } from "../stores/store.js";

export default defineComponent({
  components: { CardListProd },
  name: "IndexPage",
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
});
</script>
