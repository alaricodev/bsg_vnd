<template>
  <div class="scroll-container">
    <div class="scroll-content">
      <div
        v-for="item in store.destaques"
        :key="item.refId"
        class="q-pa-md"
        style="display: inline-block"
      >
        <q-img
          :src="srcImg(item.foto)"
          clickable
          @click="acessaRota(item.refId)"
          class="borda-img cursor-pointer"
          :style="
            isMobile
              ? `width: 150px; height: 210px`
              : `width: 300px; height: 420px`
          "
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "../stores/store";
export default {
  name: "carroselDestaque",
  props: ["texto"],
  setup() {
    const store = useStore();
    return {
      store,
    };
  },

  computed: {
    isMobile() {
      return screen.width < 600;
    },
  },
  methods: {
    acessaRota(id) {
      this.$router.push(`/produtoDetalhe/${id}`);
    },
    srcImg(nome) {
      return `fotos/${nome}`;
    },
  },
};
</script>
<style>
div.scrollmenu {
  width: auto;
  height: auto;
  overflow-x: overlay;
  overflow-y: hidden;
  white-space: nowrap;
  scrollbar-width: none;
}
.scrollmenu::-webkit-scrollbar {
  display: none;
}

.scroll-container {
  width: 100%;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  white-space: nowrap;
  scrollbar-width: none;
}

.scroll-content {
  display: inline-block;
  scroll-snap-align: start;
}

.borda-img {
  border-radius: 5px;
}
</style>
