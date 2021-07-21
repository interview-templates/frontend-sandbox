<template>
  <div class="about">
    <h1>{{ name }}</h1>
    <HelloWorld />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { get } from "vuex-pathify";

export default {
  name: "Home",
  computed: {
    name: function () {
      return this.$store.state.name;
    },
  },
  components: {
    HelloWorld,
  },
};
</script>
