<template>
  <div class="q-ma-sm row items-start" style="width: 100%">
    <q-btn
      flat
      icon="arrow_back_ios"
      style="width: 10%"
      class="q-pa-sm"
      to="/"
    />
    <div
      class="text-center q-pa-sm text-weight-regular text-h6 text-primary"
      style="width: 90%"
    >
      {{ categoriaNome }}
    </div>
  </div>
  <q-page>
    <div class="flex flex-center">
      <card-list-prod :categoria="categoriaNome" />
    </div>
  </q-page>
  <botao-fluante />
</template>

<script>
import { ref } from "vue";
import { useStore } from "src/stores/store";
import CardListProd from "src/components/cardListProd.vue";
import BotaoFluante from "src/components/BotaoFluante.vue";
export default {
  components: { CardListProd, BotaoFluante },
  setup() {
    const store = useStore();
    return {
      store,
      id: ref(null),
      categoriaNome: ref(null),
    };
  },

  beforeMount() {
    this.id = this.$route.params.id;
    console.log(this.id);
    const objetoTemp = this.store.produtos.find(
      (item) => item.idCat == this.id
    );
    this.categoriaNome = objetoTemp.categoria;
    console.log(this.categoriaNome);
  },
};
</script>

<style lang="scss" scoped></style>
