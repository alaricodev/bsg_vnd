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
      CARRINHO DE COMPRAS
    </div>
  </div>
  <q-separator />
  <div class="q-pa-md" style="max-width: 100%">
    <q-list
      bordered
      padding
      style="justify-content: center; align-items: center"
    >
      <q-item>
        <q-item-section>
          <q-item-label>Pão de Abóbora - 900g</q-item-label>
          <q-item-label overline>01 x R$ 26,90</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label overline> R$ 26,90 </q-item-label>
          <q-btn flat icon="delete" color="red" />
        </q-item-section>
      </q-item>
      <q-separator spaced />
      <q-item>
        <q-item-section>
          <q-item-label class="text-primary"
            >Pão Australiano - 900g</q-item-label
          >
          <q-item-label overline>02 x R$ 32,90</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label overline> R$ 65,80 </q-item-label>
          <q-btn flat icon="delete" color="red" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>

  <divisor-tela height="1rem" />
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
    <q-date v-model="dataPedido" :options="getValidDates()" />
  </div>
  <div class="row text-overline q-ma-md">
    A nossa entrega é feita em dias úteis. Os pedidos feitos até às 11:00 podem
    ser entregues no mesmo dia.
  </div>
  <divisor-tela height="1rem" />
  <div class="q-ma-md">
    <q-btn label="Finalizar Pedido" color="primary" style="width: 100%" />
  </div>
</template>

<script>
import divisorTela from "../components/divisorTela.vue";
import { useStore } from "../stores/store.js";
import { ref } from "vue";

export default {
  components: { divisorTela },
  setup() {
    const store = useStore();
    return {
      store,
      dataPedido: ref(null),
      opEntrega: ref(null),
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
