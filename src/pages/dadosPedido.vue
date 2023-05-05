<template>
  <div class="q-ma-sm row items-start" style="width: 100%">
    <q-btn
      flat
      icon="arrow_back_ios"
      style="width: 10%"
      class="q-pa-sm"
      @click="backCarrinho()"
    />
    <div
      class="text-center q-pa-sm text-weight-regular text-h6 text-primary"
      style="width: 90%"
    >
      ENCERRAMENTO DO COMPRA
    </div>
  </div>
  <q-separator />
  <!-- Dados Pessoais -->
  <div class="q-pa-md" style="max-width: 100%">
    <div class="text-subtitle1 q-pa-md">
      <q-icon name="person" size="xs" />
      Dados Pessoais
    </div>
    <div>
      <div class="row q-pa-md">
        <q-input
          dense
          v-model="nome"
          label="Informe o seu nome"
          style="width: 100%"
        />
      </div>
      <div class="row q-pa-md">
        <q-input
          dense
          type="tel"
          mask="(##) ##### - ####"
          v-model="telefone"
          label="Informe o seu Telefone"
          style="width: 100%"
        />
      </div>
    </div>
  </div>
  <divisorTela height="1rem" />
  <!-- Dados de retirada -->
  <div>
    <div class="text-subtitle1 q-pa-md">
      <q-icon name="local_shipping" size="xs" />
      Opções de entrega
      <q-badge
        v-show="opEntrega == null"
        outline
        color="red"
        label="Selecione uma opção"
      />
    </div>
    <div class="q-pa-sm">
      <q-radio v-model="opEntrega" val="e" label="Entrega" />
      <q-radio v-model="opEntrega" val="r" label="Retirada" />
    </div>
    <div v-show="opEntrega == 'e'" class="row text-overline q-ma-md">
      <!-- Endereço de entrega -->
      <div style="width: 100%">
        <div class="text-subtitle1 q-py-md">
          <q-icon name="home" size="xs" />
          Endereço de entrega
        </div>
        <div class="row" style="width: 100%">
          <div class="col-7 q-pa-sm">
            <q-input
              dense
              v-model="cep"
              type="tel"
              mask="#####-###"
              unmasked-value
              label="Informe o CEP"
              style="width: 100%"
            />
          </div>
          <div class="col-5 q-pa-sm">
            <q-btn
              label="Buscar CEP"
              color="primary"
              style="width: 100%"
              @click="buscaCep()"
            />
          </div>
        </div>
        <div class="row q-pa-sm" style="width: 100%">
          <q-input
            dense
            v-model="logradouro"
            label="Informe o endereço"
            style="width: 100%"
          />
        </div>
        <div class="row q-pa-sm" style="width: 100%">
          <q-input
            dense
            ref="refNumero"
            v-model="numero"
            label="Informe o número"
            style="width: 100%"
          />
        </div>
        <div class="row q-pa-sm" style="width: 100%">
          <q-input
            dense
            v-model="complemento"
            label="Informe o Complemento do endereço"
            style="width: 100%"
          />
        </div>
        <div class="row q-pa-sm" style="width: 100%">
          <q-input
            dense
            v-model="bairro"
            label="Informe o bairro"
            style="width: 100%"
          />
        </div>
        <div class="row q-pa-sm" style="width: 100%">
          <q-input
            dense
            v-model="cidade"
            label="Informe o cidade"
            style="width: 100%"
          />
        </div>
      </div>

      <!-- Selecionar Frete -->
      <div style="width: 100%">
        <div class="text-subtitle1 q-py-md">
          <q-icon name="home" size="xs" />
          Opções de Frete
        </div>
        <div class="q-pa-sm">
          <lista-frete />
        </div>
      </div>
    </div>
  </div>

  <divisorTela height="1rem" />
  <!-- Finalizar -->
  <div class="q-pa-md" style="max-width: 100%">
    <q-btn
      icon="fa-brands fa-whatsapp"
      label="Enviar o pedido pelo whatsapp"
      color="green-7"
      style="width: 100%"
    />
  </div>
</template>

<script>
import { useStore } from "../stores/store.js";
import { ref } from "vue";
import divisorTela from "src/components/divisorTela.vue";
import axios from "axios";
import { useQuasar } from "quasar";
import ListaFrete from "src/components/listaFrete.vue";

export default {
  components: { divisorTela, ListaFrete },
  setup() {
    const store = useStore();
    const $q = useQuasar();
    function telaCarrega(msg, vlr) {
      if (vlr) {
        $q.loading.show({
          message: msg,
        });
      } else {
        $q.loading.hide();
      }
    }
    function alerta(title, msg) {
      $q.dialog({
        title: title,
        message: msg,
      })
        .onOk(() => {
          // console.log('OK')
        })
        .onCancel(() => {
          // console.log('Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    }
    return {
      alerta,
      telaCarrega,
      store,
      nome: ref(null),
      telefone: ref(null),
      cep: ref(null),
      logradouro: ref(null),
      complemento: ref(null),
      numero: ref(null),
      bairro: ref(null),
      cidade: ref(null),
      localFrete: ref(null),

      opEntrega: ref(null),
      opFrete: ref([
        "Continente - R$ 10,00",
        "Barreiros - R$ 10,00",
        "Ilha Centro - R$ 15,00",
        "Norte da ilha - R$ 25,00",
        "Sul da Ilha - R$ 30,00",
      ]),
    };
  },
  mounted() {
    this.store.carrinhoAberto = true;
  },
  beforeUnmount() {
    this.store.carrinhoAberto = false;
  },
  methods: {
    backCarrinho() {
      this.$router.push("/carrinho");
    },
    buscaCep() {
      const viaCepUrl = `https://viacep.com.br/ws/${this.cep}/json/`;
      this.telaCarrega("Procurando CEP", true);
      axios
        .get(viaCepUrl)
        .then((response) => {
          if (response.data.erro) {
            this.telaCarrega("", false);
            this.alerta("Aviso", "CEP não encontrado !");
          } else {
            console.log(response.data);
            this.logradouro = response.data.logradouro;
            this.cidade = response.data.localidade;
            this.bairro = response.data.bairro;
            this.$refs.refNumero.focus();
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.telaCarrega("", false);
        });
    },
  },
};
</script>
