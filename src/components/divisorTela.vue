<template>
  <div class="my-example-divider" :style="{ height: height }"></div>
</template>
<script>
export default {
  props: {
    height: {
      type: String,
      required: true,
    },
  },
};
</script>
<style>
.my-example-divider {
  width: 100%;
  height: 1.2rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid 1px rgba(0, 0, 0, 0.15);
  box-shadow: inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.my-example-divider:before,
.my-example-divider:after {
  box-sizing: border-box;
}
</style>
