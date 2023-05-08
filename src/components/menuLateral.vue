<template>
  <div>
    <div class="bg-primary div-header q-ma-sm flex flex-center">
      <q-img
        src="../../public/logo_transparente.png"
        :ratio="1"
        class="img-logo"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "../stores/store.js";
export default {
  name: "menuLateral",
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
};
</script>

<style>
.div-header {
  border-radius: 5px;
  width: 95%;
  height: 150px;
}
.img-logo {
  width: 150px;
  height: 150px;
}
</style>
