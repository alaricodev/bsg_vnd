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
      <card-list-prod :categoria="idCat" />
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { useStore } from "src/stores/store";
export default {
  setup() {
    const store = useStore();
    return {
      store,
      categoriaNome: ref("PRODUTOS"),
    };
  },
  props: {
    idCat: {
      type: Number,
      default: 1,
    },
  },
  mounted() {
    const objetoTemp = this.produtos.find((item) => item.idCat == this.idCat);
    this.categoriaNome = objetoTemp.categoria;
  },
};
</script>

<style lang="scss" scoped></style>
