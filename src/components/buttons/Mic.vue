<template>
  <div class="video-button" @click="toggleButton">
    <mic-svg v-if="active" />
    <mic-mute-svg v-else />
  </div>
</template>

<script>
import MicSvg from "@/components/svg/Mic.vue";
import MicMuteSvg from "@/components/svg/MicMute.vue";

export default {
  name: "Mic",
  data() {
    return {
      active: true,
    };
  },
  components: {
    MicSvg,
    MicMuteSvg,
  },
  methods: {
    toggleButton() {
      this.active = !this.active;
    },
  },
};
</script>

<style scoped lang="stylus">
.video-button
  background: #D9D9D9
  height: 55px
  width: 55px
  border-radius: 100px
  display flex
  justify-content center
  align-items center
  cursor: pointer
  margin-right: 10px

.video-button:hover
  background: rgba(217, 217, 217, 0.5)
</style>
