<template>
  <div
    class="fullscreen bg-primary text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div>
        <q-img src="../../public/logo_transparente.png" :ratio="1" />
      </div>
      <div style="font-size: 3vh">Obrigado pela confiança</div>

      <div class="text-h5" style="opacity: 0.4">Aguarde o nosso retorno</div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="primary"
        unelevated
        to="/"
        label="VOLTAR"
        no-caps
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ErrorNotFound",
});
</script>
