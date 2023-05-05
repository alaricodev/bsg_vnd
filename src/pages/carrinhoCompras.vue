<template>
  <!-- Tela principal começa aqui -->
  <div v-if="store.totalItens == 0">
    <div class="flex flex-center">
      <div class="row text-h5 text-primary">Carrinho Vazio</div>
      <div class="row q-pa-md">
        <q-btn outline label="Voltar" color="primary" @click="backIndex()" />
      </div>
    </div>
  </div>
  <div v-else>
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
        CARRINHO DE COMPRAS
      </div>
    </div>

    <div class="q-pa-md" style="max-width: 100%">
      <q-list
        bordered
        padding
        style="justify-content: center; align-items: center"
      >
        <q-item v-for="item in store.carrinho" :key="item.id">
          <q-item-section>
            <q-item-label>{{ item.nome }}</q-item-label>
            <q-item-label overline
              >{{ item.qtd }} x {{ forCurr.format(item.valor) }}</q-item-label
            >
          </q-item-section>

          <q-item-section side top>
            <q-item-label overline>
              {{ forCurr.format(item.total) }}
            </q-item-label>
            <q-btn
              flat
              icon="delete"
              color="red"
              @click="apagarItem(item.id, item.nome)"
            />
          </q-item-section>
        </q-item>
      </q-list>
      <div class="q-my-md" style="width: 100%">
        <div class="row bg-secondary q-pa-sm" style="border-radius: 5px">
          <div class="text-h6">TOTAL</div>
          <q-space />
          <div class="text-h6 text-primary">
            {{ forCurr.format(store.totalCarrinho) }}
          </div>
        </div>
      </div>
    </div>

    <divisorTela height="1rem" />
    <!-- Dados de Pagamento -->
    <div class="q-pa-md" style="max-width: 100%">
      <div class="text-subtitle1 q-pa-md">
        <q-icon name="payments" size="xs" />
        Dados de pagamento
        <q-badge
          v-show="pagamento == null"
          outline
          color="red"
          label="Escolha um"
        />
      </div>

      <div>
        <div class="q-pa-sm">
          <q-option-group
            v-model="pagamento"
            :options="opPagamento"
            color="primary"
          />
        </div>
      </div>
    </div>
    <divisor-tela height="1rem" />
    <div class="text-subtitle1 q-pa-md">
      <q-icon name="calendar_month" size="xs" />
      Agendamento da entrega
    </div>
    <div
      class="q-pa-sm"
      style="display: flex; justify-content: center; align-items: center"
      v-show="dataPedido == null"
    >
      <q-badge outline color="red" label="Selecione uma data" />
    </div>
    <div
      class="q-pa-sm"
      style="display: flex; justify-content: center; align-items: center"
    >
      <q-date
        v-model="dataPedido"
        :minimal="dataPedido == null ? true : false"
        :options="getValidDates()"
      />
    </div>
    <div class="row text-overline q-ma-md">
      A nossa entrega é feita em dias úteis. Os pedidos feitos até às 11:00
      podem ser entregues no mesmo dia.
    </div>
    <divisor-tela height="1rem" />
    <div class="q-ma-md">
      <q-btn
        label="Finalizar Pedido"
        color="primary"
        style="width: 100%"
        @click="finalizaPedido()"
      />
    </div>
  </div>
</template>

<script>
import divisorTela from "../components/divisorTela.vue";
import { useStore } from "../stores/store.js";
import { ref } from "vue";
import { useQuasar } from "quasar";

export default {
  components: { divisorTela },
  setup() {
    const store = useStore();
    const $q = useQuasar();
    const forCurr = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    function apagarItem(id, produto) {
      $q.dialog({
        title: "Confirmação",
        message: `Confirma a retirada do ${produto} ?`,
        ok: {
          push: true,
        },
        cancel: {
          push: true,
          color: "negative",
        },
        persistent: true,
      })
        .onOk(() => {
          store.retiraCarrinho(id);
          showNotif("Item Removido com sucesso !", "red");
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    }
    function showNotif(msg, color) {
      $q.notify({
        message: msg,
        icon: "announcement",
        color: color,
        position: "center",
      });
    }
    return {
      showNotif,
      apagarItem,
      forCurr,
      store,
      dataPedido: ref(null),
      pagamento: ref(null),
      opPagamento: ref([
        { label: "Pix", value: "pix" },
        { label: "Cartão de Crédito (via link)", value: "cred" },
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
    backIndex() {
      this.$router.push("/");
    },
    finalizaPedido() {
      if (this.validarDados()) {
        this.$router.push("/dadospedido");
      }
    },
    validarDados() {
      if (this.dataPedido == null) {
        this.showNotif("Informe uma data para a entrega !", "indigo");
        return false;
      }
      if (this.pagamento == null) {
        this.showNotif("Informe um meio de pagamento !", "blue");
        return false;
      }
      return true;
    },
    getValidDates() {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      const isAfter11am = today.getHours() >= 11;

      // Se já passou das 11h, considera a data de amanhã como data inicial
      const startDate = isAfter11am ? tomorrow : today;

      const validDates = [];

      // Percorre os próximos 60 dias a partir da data inicial
      for (let i = 0; i < 60; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);

        // Verifica se a data é um dia da semana útil
        const dayOfWeek = currentDate.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          // 0 = Domingo, 6 = Sábado
          const dateString = currentDate
            .toISOString()
            .slice(0, 10)
            .replace(/-/g, "/");
          validDates.push(dateString);
        }
      }

      return validDates;
    },
  },
};
</script>
