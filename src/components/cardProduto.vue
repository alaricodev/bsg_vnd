<template>
  <div class="q-pa-md row items-start q-gutter-md" style="max-width=300px">
    <q-card class="my-card">
      <q-img :src="dados.foto" />

      <q-card-section>
        <q-btn
          fab
          color="primary"
          icon="add"
          label="Detalhes"
          class="absolute"
          style="top: 0; right: 12px; transform: translateY(-50%)"
        />

        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">{{ dados.nome }}</div>
          <div
            class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
          ></div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">
          R$ {{ dados.preco }} - {{ dados.peso }}
        </div>
        <div class="text-caption text-grey">
          {{ dados.descricao }}
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn flat round icon="shopping_cart" />
        <q-btn flat color="primary"> Adicionar </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "cardProduto",
  props: {
    dados: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {};
  },
};
</script>
