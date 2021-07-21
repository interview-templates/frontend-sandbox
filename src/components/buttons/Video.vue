<template>
  <div class="video-button" @click="toggleButton">
    <video-svg v-if="active" />
    <video-off-svg v-else />
  </div>
</template>

<script>
import VideoSvg from "@/components/svg/Video.vue";
import VideoOffSvg from "@/components/svg/VideoOff.vue";

export default {
  name: "Video",
  data() {
    return {
      active: true,
    };
  },
  components: {
    VideoSvg,
    VideoOffSvg,
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
