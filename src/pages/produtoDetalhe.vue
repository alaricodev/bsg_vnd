<template>
  <!-- Tela principal começa aqui -->

  <div class="q-ma-sm row items-start" style="width: 100%">
    <q-btn
      flat
      icon="arrow_back_ios"
      style="width: 10%"
      class="q-pa-sm"
      @click="backIndex()"
    />
    <div
      class="text-center q-pa-sm text-weight-regular text-h6 text-primary"
      style="width: 90%"
    >
      DETALHES DO PRODUTO
    </div>
  </div>
  <q-separator />
  <div
    class="q-pa-md row items-start q-gutter-md"
    style="justify-content: center; align-items: center"
  >
    <q-card class="my-card" flat bordered>
      <q-img :src="srcImg" :ratio="1" />

      <q-card-section>
        <div class="text-overline text-primary">
          {{ store.produtoSel.categoria }}
        </div>
        <div class="text-h5 q-mt-sm q-mb-xs">
          {{ store.produtoSel.nome }} - {{ store.produtoSel.peso }}
        </div>
        <div class="text-subitle2 text-grey">
          {{ store.produtoSel.descricaoLonga }}
        </div>
        <div class="text-h6 text-primary">R$ {{ store.produtoSel.preco }}</div>
      </q-card-section>

      <q-card-actions>
        <q-btn square color="primary" icon="remove" @click="adicionaQtd('-')" />

        <div class="rounded-box">
          <div class="text-h6 text-bold">
            {{ quantidade }}
          </div>
        </div>
        <q-btn square color="primary" icon="add" @click="adicionaQtd('+')" />
        <q-btn
          class="q-mx-sm"
          style="widows: 120px"
          outlined
          color="primary"
          :label="strBotao"
          @click="addItemCarrinho()"
        />

        <q-space />

        <!-- <q-btn
          color="grey"
          round
          flat
          dense
          :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expanded = !expanded"
        /> -->
      </q-card-actions>

      <!-- <q-slide-transition>
        <div v-show="expanded">
          <q-separator />
          <q-card-section class="text-caption">
            <q-btn
              label="Voltar"
              icon="arrow_back"
              @click="backIndex"
              style="width: 100%; justify-content: center; align-items: center"
            />
          </q-card-section>
        </div>
      </q-slide-transition> -->
    </q-card>
  </div>
</template>

<script>
import { useStore } from "../stores/store.js";
import { ref } from "vue";

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
      expanded: ref(true),
      quantidade: ref(1),
      preco: ref(null),
      strBotao: ref(""),
    };
  },
  mounted() {
    this.preco = parseFloat(this.store.produtoSel.preco.replace(",", "."));
    this.quantidade = 1;
    this.total = this.quantidade * this.preco;
    this.strBotao = `Adicionar - ${this.forCurr.format(this.total)}`;
  },
  computed: {
    srcImg() {
      return "fotos/" + this.store.produtoSel.foto;
    },
  },
  watch: {
    quantidade() {
      this.total = this.quantidade * this.preco;
      this.strBotao = `Adicionar - ${this.forCurr.format(this.total)}`;
    },
  },
  methods: {
    adicionaQtd(oper) {
      if (oper == "+") {
        this.quantidade++;
      } else {
        if (this.quantidade > 1) {
          this.quantidade--;
        }
      }
    },

    backIndex() {
      this.$router.push("/");
    },

    addItemCarrinho() {
      this.store.adicionarCarrinho(this.store.produtoSel.id, this.quantidade);
      this.$router.push("/");
    },
  },
};
</script>

<style>
.my-card {
  width: 100%;
  max-width: 550px;
}

.rounded-box {
  border: 1px solid #8f1b1e;
  padding-top: 1px; /* adiciona um espaçamento interno de 20 pixels na parte superior */
  padding-bottom: 1px; /* adiciona um espaçamento interno de 20 pixels na parte inferior */
  padding-left: 10px; /* adiciona um espaçamento interno de 10 pixels na parte esquerda */
  padding-right: 10px;
}

.topo {
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
}
</style>
