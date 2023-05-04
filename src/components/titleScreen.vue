<template>
  <header style="width: 100%">
    <div class="col" style="width: 10%">
      <q-btn flat icon="arrow_back_ios" />
    </div>
    <div class="col">
      <div class="text-h6 text-center">{{ title }}</div>
    </div>
  </header>
</template>
<script>
export default {
  setup() {},
  name: "titleScreen",
  props: {
    showButton: Boolean,
    title: String,
  },
};
</script>
