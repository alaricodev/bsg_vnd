<template>
  <!-- <q-card class="my-card">
    <q-img :src="srcImg" :ratio="1" style="max-height: 150px" />

    <q-card-section>
      <div class="row no-wrap items-center">
        <div class="col text-subtitle text-bold elipse">
          {{ produto.nome }}
        </div>
        <div class="row text-subtitle1 text-bold text-primary">
          {{ produto.preco }}
        </div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <q-btn
        flat
        round
        color="primary"
        icon="shopping_cart"
        label="Adicionar também"
      />
    </q-card-actions>
  </q-card> -->
  <q-item v-ripple>
    <q-item-section thumbnail>
      <img :src="srcImg" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ produto.nome }}</q-item-label>
      <q-item-label>{{ produto.preco }}</q-item-label>
    </q-item-section>
    <q-item-section side top>
      <q-btn flat color="primary" icon="add" @click="teste(produto.nome)" />
    </q-item-section>
  </q-item>
</template>

<script>
import { useStore } from "../stores/store";
import { ref } from "vue";
export default {
  name: "comprarJunto",
  props: {
    produto: Object,
  },
  setup() {
    const store = useStore();
    return {
      store,
      quantidade: ref(0),
    };
  },
  computed: {
    srcImg() {
      return "fotos/" + this.produto.foto;
    },
  },
  mounted() {
    console.log(this.produto);
  },
  methods: {
    teste(valor) {
      alert(valor);
    },
  },
};
</script>

<style>
.my-card {
  width: 100%;
  max-width: 300px;
}
</style>
