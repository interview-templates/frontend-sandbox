<template>
  <div class="video-button video-button_phone-off" @click="onClick">
    <phone-down-svg />
  </div>
</template>

<script>
import PhoneDownSvg from "@/components/svg/PhoneDown.vue";

export default {
  name: "PhoneDown",
  data() {
    return {
      active: true,
    };
  },
  components: {
    PhoneDownSvg,
  },
  methods: {
    onClick() {
      this.$emit("click");
    },
  },
};
</script>

<style scoped lang="stylus">
//@Todo Refactoring BEM
.video-button
  height: 55px
  width: 55px
  border-radius: 100px
  display flex
  justify-content center
  align-items center
  cursor: pointer
  margin-right: 10px

.video-button_phone-off
  background: #990000

.video-button:hover
  background: rgba(153, 0, 0, 0.30)
</style>
