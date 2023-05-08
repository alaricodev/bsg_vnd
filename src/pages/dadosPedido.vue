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
          ref="refNome"
          label="Informe o seu nome"
          style="width: 100%"
        />
      </div>
      <div class="row q-pa-md">
        <q-input
          dense
          type="tel"
          ref="refTel"
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
              ref="refCep"
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
            ref="reflogradouro"
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
            ref="refComplemento"
            label="Informe o Complemento do endereço"
            style="width: 100%"
          />
        </div>
        <div class="row q-pa-sm" style="width: 100%">
          <q-input
            dense
            v-model="bairro"
            ref="refBairro"
            label="Informe o bairro"
            style="width: 100%"
          />
        </div>
        <div class="row q-pa-sm" style="width: 100%">
          <q-input
            dense
            v-model="cidade"
            ref="refCidade"
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
      @click="fazerPedido()"
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
import { validarTelefone, validarCEP, mensagemZap } from "src/utils/util.js";

export default {
  components: { divisorTela, ListaFrete },
  setup() {
    const store = useStore();
    const $q = useQuasar();
    function showNotif(msg, color) {
      $q.notify({
        message: msg,
        icon: "announcement",
        color: color,
        position: "center",
      });
    }
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
    const forCurr = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    return {
      forCurr,
      showNotif,
      alerta,
      telaCarrega,
      store,
      storageCliente: ref(null),
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
    if (localStorage.getItem(this.store.lsCliKey) !== null) {
      this.storageCliente = this.store.carregarLs(this.store.lsCliKey);
      this.nome = this.storageCliente.nome;
      this.telefone = this.storageCliente.telefone;
      this.cep = this.storageCliente.cep;
      this.logradouro = this.storageCliente.logradouro;
      this.numero = this.storageCliente.numero;
      this.complemento = this.storageCliente.complemento;
      this.bairro = this.storageCliente.bairro;
      this.cidade = this.storageCliente.cidade;
    }
  },
  beforeUnmount() {
    this.store.carrinhoAberto = false;
  },
  methods: {
    backCarrinho() {
      this.$router.push("/carrinho");
    },
    buscaCep() {
      if (!validarCEP(this.cep)) {
        this.showNotif("CEP inválido", "blue");
        this.$refs.refCep.focus();
        return false;
      }
      const viaCepUrl = `https://viacep.com.br/ws/${this.cep}/json/`;
      this.telaCarrega("Procurando CEP", true);
      axios
        .get(viaCepUrl)
        .then((response) => {
          if (response.data.erro) {
            this.telaCarrega("", false);
            this.alerta("Aviso", "CEP não encontrado !");
          } else {
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

    validarDados() {
      if (this.nome == null) {
        this.showNotif("Informe seu nome ! ", "blue");
        this.$refs.refNome.focus();
        return false;
      }
      if (!validarTelefone(this.telefone)) {
        this.showNotif("O telefone não parece ser válido", "blue");
        this.$refs.refTel.focus();
        return false;
      }
      if (this.opEntrega == "e") {
        if (!validarCEP(this.cep)) {
          this.showNotif("O CEP não parece ser válido", "blue");
          this.$refs.refCep.focus();
          return false;
        }

        if (this.logradouro == null) {
          this.showNotif("Preencha o endereço", "blue");
          this.$refs.reflogradouro.focus();
          return false;
        }

        if (this.numero == null) {
          this.showNotif("Preencha o número", "blue");
          this.$refs.refNumero.focus();
          return false;
        }

        if (this.bairro == null) {
          this.showNotif("Preencha o Bairro", "blue");
          this.$refs.refBairro.focus();
          return false;
        }

        if (this.cidade == null) {
          this.showNotif("Preencha a cidade", "blue");
          this.$refs.refCidade.focus();
          return false;
        }

        if (this.store.opcaoFrete == null) {
          this.showNotif("Escolha uma opção de frete", "blue");
          return false;
        }
      } else if (this.opEntrega == null) {
        this.showNotif("Escolha uma opção de Entrega", "blue");
        return false;
      }

      return true;
    },
    fazerPedido() {
      if (this.validarDados()) {
        // Criar Objeto do Pedido
        const pedido = {
          telefoneEnvio: this.store.telefoneWhatsApp,
          cliente: {
            nome: this.nome,
            telefone: this.telefone,
            cep: this.cep,
            logradouro: this.logradouro,
            numero: this.numero,
            complemento: this.complemento,
            bairro: this.bairro,
            cidade: this.cidade,
          },
          produtos: this.store.carrinho,
          subtotal: this.store.totalCarrinho,
          valorFrete: this.opEntrega == "e" ? this.store.opcaoFrete : 0,
          valorTotal:
            this.opEntrega == "e"
              ? this.store.totalCarrinho + this.store.opcaoFrete
              : this.store.totalCarrinho,
          tipoPagamento: this.store.tipoPagamento,
          dataPedido: this.store.dataPedido,
          opEntrega: this.opEntrega,
          header: "Confira Aqui o Seu pedido",
          footer: "Obrigado pela confiança",
        };
        // Criar mensagem do whatsapp para ser enviada

        // limpar o carrinho no pinia
        this.store.limparCarrinho();

        // limpar o carrinho no localStorage
        this.store.apagarLs(this.store.lsCarrinhoKey);

        // Caso seja um caso de entrega, guardar os dados para a próxima compra
        if (this.opEntrega == "e") {
          this.store.salvarLs(this.store.lsCliKey, pedido.cliente);
        }

        // Enviar dados para o whatsapp
        window.open(mensagemZap(pedido), "_blank");
        this.$router.push("/termino");
      }
    },
  },
};
</script>
